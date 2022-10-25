package com.ssafy.weplog.domain.mysql.crew.controller;

import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewRequest;
import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewResponse;
import com.ssafy.weplog.domain.mysql.crew.service.CrewService;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crew")
public class CrewController {

    private final CrewService crewService;

    // 크루 생성하기
    @PostMapping
    public ResponseEntity<CreateCrewResponse> createClan(@RequestPart CreateCrewRequest request, @RequestPart MultipartFile image,
                                                         @ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
        return ResponseEntity.status(HttpStatus.CREATED).body(crewService.createCrew(request, image, member));
    }
}
