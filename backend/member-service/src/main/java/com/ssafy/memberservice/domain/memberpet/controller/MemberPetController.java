package com.ssafy.memberservice.domain.memberpet.controller;

import com.ssafy.memberservice.domain.memberpet.service.MemberPetService;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/mypet")
@RestController
public class MemberPetController {

    MemberPetService memberPetService;

    @ApiOperation(value = "나의 모든 펫 조회하기")
    @GetMapping
    public ResponseEntity<?> getMyPets(@ApiIgnore @RequestHeader("memberId") UUID memberId) {
        return ResponseEntity.ok(memberPetService.getMyPets(memberId));
    }

    @ApiOperation(value = "나의 펫 조회하기")
    @GetMapping("/{petId}")
    public ResponseEntity<?> getMyPet(@ApiIgnore @RequestHeader("memberId") UUID memberId, @PathVariable("petId") Long petId) {
        return ResponseEntity.ok(memberPetService.getMyPet(memberId, petId));
    }

    @ApiOperation(value = "나의펫 종류 조회하기")
    @GetMapping("/kinds")
    public ResponseEntity<?> getMyPetsKind(@ApiIgnore @RequestHeader("memberId") UUID memberId) {
        return ResponseEntity.ok(memberPetService.getMyPetsKind(memberId));
    }

    @ApiOperation(value = "나의펫 등록하기")
    @PostMapping("/{petId}")
    public ResponseEntity<?> postMyPets(@ApiIgnore @RequestHeader("memberId") UUID memberId, @PathVariable("petId") Long petId) {
        memberPetService.postMyPet(memberId, petId);
        return ResponseEntity.ok().build();
    }

}
