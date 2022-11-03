package com.ssafy.memberservice.domain.member.controller;

import com.ssafy.memberservice.domain.member.dto.MemberReq;
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

    @ApiOperation(value = "회원정보입력")
   @PostMapping("/info")
    public ResponseEntity<?> postMemberInfo(@ApiIgnore @RequestHeader("memberId")UUID memberId,
                                            @RequestBody MemberReq memberReq) {

        return null;
    }

    @ApiOperation(value = "선택된 동물 등록")
    @PostMapping("/pet")
    public ResponseEntity<?> getPet(@ApiIgnore @RequestHeader("memberId")UUID memberId) {
        return ResponseEntity.ok("ANIMAL");
    }

    @ApiOperation(value = "닉네임 중복 검사")
    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname,
                                           @ApiIgnore @RequestHeader("memberId")UUID memberId) {
        return ResponseEntity.ok(memberId);
    }
}
