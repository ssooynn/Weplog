package com.ssafy.memberservice.domain.member.controller;

import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.member.dto.MemberReq;
import com.ssafy.memberservice.domain.member.service.MemberService;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import com.ssafy.memberservice.global.security.util.JwtTokenProvider;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.ws.rs.core.HttpHeaders;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Slf4j
public class MemberController {
    private final MemberService memberService;

    private final JwtTokenProvider jwtTokenProvider;

    @ApiOperation(value = "회원정보입력")
    @PutMapping("/info")
    public ResponseEntity<String> postMemberInfo(@ApiIgnore @RequestHeader("memberId") String memberId, @ApiIgnore @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
                                                 @RequestPart MemberReq request, @RequestPart MultipartFile image) {
        Member member = memberService.updateMemberInfo(UUID.fromString(memberId), request, image);

        // 2. 유저정보 얻기
//        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
//
//
//        principal.setNickname(request.getNickname());
//        String returnAccessToken = jwtTokenProvider.createAccessToken(authentication);

//        String accessToken1 = jwtTokenProvider.createAccessToken((Authentication) CustomUserDetails.create(member));
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "선택된 동물 등록")
    @PostMapping("/pet/{petId}")
    public ResponseEntity<?> postPet(@ApiIgnore @RequestHeader("memberId") String memberId,
                                     @PathVariable("petId") Long petId) {
        memberService.postMyPet(UUID.fromString(memberId), petId);
        return ResponseEntity.ok("CONGRATS! ANIMAL IS ENROLLED");
    }

    @ApiOperation(value = "닉네임 중복 검사", notes = "false -> 중복되지 않음, true -> 중복됨 ")
    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname, @ApiIgnore @RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken) {
        log.info("들어온 닉네임: -> {}", nickname);
//        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        return new ResponseEntity<>(memberService.checkDoubleNickname(nickname), HttpStatus.OK);
    }
}
