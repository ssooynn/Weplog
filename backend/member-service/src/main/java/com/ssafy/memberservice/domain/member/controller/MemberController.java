package com.ssafy.memberservice.domain.member.controller;

import com.ssafy.memberservice.domain.member.dto.MemberReq;
import com.ssafy.memberservice.domain.member.service.MemberService;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @ApiOperation(value = "회원정보입력")
   @PutMapping("/info")
    public ResponseEntity<?> postMemberInfo(@ApiIgnore @RequestHeader("memberId")String memberId,
                                            @RequestPart MemberReq request, @RequestPart MultipartFile image) {
        memberService.updateMemberInfo(UUID.fromString(memberId), request, image);
        return ResponseEntity.ok("MEMBER INFO IS UPDATED");
    }

    @ApiOperation(value = "선택된 동물 등록")
    @PostMapping("/pet/{petId}")
    public ResponseEntity<?> postPet(@ApiIgnore @RequestHeader("memberId")String memberId,
                                     @PathVariable("petId") Long petId) {
        memberService.postMyPet(UUID.fromString(memberId), petId);
        return ResponseEntity.ok("CONGRATS! ANIMAL IS ENROLLED");
    }

    @ApiOperation(value = "닉네임 중복 검사", notes = "false -> 중복되지 않음, true -> 중복됨 ")
    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String nickname) {
        return new ResponseEntity<>(memberService.checkDoubleNickname(nickname), HttpStatus.OK);
    }
}
