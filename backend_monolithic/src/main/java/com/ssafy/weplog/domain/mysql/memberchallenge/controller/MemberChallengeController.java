package com.ssafy.weplog.domain.mysql.memberchallenge.controller;

import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@RestController
@RequestMapping("memberChallenge")
public class MemberChallengeController {

    @ApiOperation(value = "챌린지 참가")
    @PostMapping("/{challengeId}")
    public ResponseEntity<?> postChallengeApplication(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member,
                                                      @PathVariable("challengeId") String challengeId) {
        return ResponseEntity.ok().build();
    }
}
