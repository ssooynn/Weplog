package com.ssafy.memberservice.domain.member.controller;

import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

//    @ApiOperation(value = "회원가입")
//    @PostMapping("/signup")
//    public ResponseEntity<?> registerMember(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
//        return null;
//    }
//
//    @ApiOperation(value = "로그인")
//    @PostMapping("/login")
//    public ResponseEntity<?> loginMember(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
//        return null;
//    }

    @ApiOperation(value = "회원정보입력")
   @PostMapping("/info")
    public ResponseEntity<?> postMemberInfo(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return null;
    }

    @ApiOperation(value = "동물 선택")
    @PostMapping("/pet")
    public ResponseEntity<?> getPet(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.ok("ANIMAL");
    }

    @ApiOperation(value = "닉네임 중복 검사")
    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname,
                                           @RequestHeader("userId")UUID userId) {
        return ResponseEntity.ok(userId);
    }
}
