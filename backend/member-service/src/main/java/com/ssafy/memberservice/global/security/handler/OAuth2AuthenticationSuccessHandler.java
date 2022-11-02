package com.ssafy.memberservice.global.security.handler;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import com.ssafy.memberservice.global.security.repository.CookieAuthorizationRequestRepository;
import com.ssafy.memberservice.global.security.util.CookieUtil;
import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.USER_NOT_FOUND;
import static com.ssafy.memberservice.global.security.repository.CookieAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Slf4j
@Component
@RequiredArgsConstructor
@Transactional
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${oauth2.authorizedRedirectUri}")
    private String redirectUri;
    private final JwtTokenProvider tokenProvider;
    private final CookieAuthorizationRequestRepository authorizationRequestRepository;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            log.debug("Response has already been committed");
            return;
        }
        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

//        Enumeration<String> parameterNames = request.getParameterNames();
//        while (parameterNames.hasMoreElements()) {
//            String paramName = parameterNames.nextElement();
//            String requestParameter = request.getParameter(paramName);
//            log.info("request {} : {}", paramName, requestParameter);
//        }

        log.info("req = {}", redirectUri.get());

        // 테스트 도중 주석으로 바꿈 -> 다른 사이트에서 로그인 시도해도 가능해짐
//        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//            throw new BadRequestException("redirect URIs are not matched");
//        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        // JWT 생성
        String accessToken = tokenProvider.createAccessToken(authentication);
        tokenProvider.createRefreshToken(authentication, response);

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        log.info("memberId -> {}",principal.getId());
        log.info("{}",principal.getUsername());

        Member member = memberRepository.findById(principal.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        boolean isNeedMoreInfo = member.getNickname() == null;

        log.info("access token: {} ", accessToken);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("accessToken", accessToken)
//                .queryParam("refreshToken",refreshToken)
                .queryParam("needMoreInfo", isNeedMoreInfo)
                .queryParam("memberId", member.getId())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);
        URI authorizedUri = URI.create(redirectUri);
        log.info(authorizedUri.toString());
        return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                && authorizedUri.getPort() == clientRedirectUri.getPort();
    }
}
