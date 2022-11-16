package com.ssafy.apigatewayserver.filter;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    private final Environment env;
    private final String SECRET_KEY;

    public AuthorizationHeaderFilter(Environment env, @Value("${token.secret}") String secretKey) {
        super(Config.class);
        this.env = env;
        this.SECRET_KEY = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // login -> token -> user(with token) -> header(include token)
    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            if (request.getMethod().matches(HttpMethod.OPTIONS.toString())) {
                return chain.filter(exchange);
            }

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "No Authorization Header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

            String jwt = authorizationHeader.replace("Bearer", "");

            if (!isJwtValid(jwt, request)) {
                return onError(exchange, "JWT token is not Valid", HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange);
        };

    }

    private boolean isJwtValid(String jwt, ServerHttpRequest request) {
        boolean returnValue = true;

        String subject = null;


        try {
            subject = getSubject(jwt);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


        if (subject == null || subject.isEmpty()) {
            return false;
        }

        String userId = request.getHeaders().get("memberId").get(0);
        if (!userId.equals(subject)) {
            returnValue = false;
        }

        return returnValue;
    }

    private String getSubject(String jwtToken) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken).getBody().getSubject();
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {

        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(err);

        return response.setComplete();
    }

    public static class Config {

    }
}
