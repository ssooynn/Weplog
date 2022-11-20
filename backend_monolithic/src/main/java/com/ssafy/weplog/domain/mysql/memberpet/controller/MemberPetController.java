package com.ssafy.weplog.domain.mysql.memberpet.controller;

import com.ssafy.weplog.domain.mysql.memberpet.service.MemberPetService;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@RequestMapping("mypet")
@RestController
public class MemberPetController {

    MemberPetService memberPetService;
    @ApiOperation(value = "나의 모든 펫 조회하기")
    @GetMapping("")
    public ResponseEntity<?> getMyPets(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.ok(memberPetService.getMyPets(member.getId()));
    }
    @ApiOperation(value = "나의 펫 조회하기")
    @GetMapping("/{petId}")
    public ResponseEntity<?> getMyPet(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member, @PathVariable("petId") String petId) {
        return ResponseEntity.ok(memberPetService.getMyPet(member.getId(), petId));
    }

    @ApiOperation(value = "나의펫 종류 조회하기")
    @GetMapping("/kinds")
    public ResponseEntity<?> getMyPetsKind(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.ok(memberPetService.getMyPetsKind(member.getId()));
    }

    @ApiOperation(value = "나의펫 등록하기")
    @PostMapping("/{petId}")
    public ResponseEntity<?> postMyPets(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member, @PathVariable("petId") Long petId) {
        memberPetService.postMyPet(petId, member.getId());
        return ResponseEntity.ok().build();
    }

}
