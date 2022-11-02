package com.ssafy.memberservice.domain.crew.controller;

import com.ssafy.memberservice.domain.crew.dto.CreateCrewRequest;
import com.ssafy.memberservice.domain.crew.dto.CreateCrewResponse;
import com.ssafy.memberservice.domain.crew.service.CrewService;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
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
@RequestMapping("/crew")
public class CrewController {

    private final CrewService crewService;

    // 크루 생성하기
    @PostMapping
    public ResponseEntity<CreateCrewResponse> createClan(@RequestPart CreateCrewRequest request, @RequestPart MultipartFile image,
                                                         @ApiIgnore @RequestHeader("memberId") UUID memberId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(crewService.createCrew(request, image, memberId));
    }
}
