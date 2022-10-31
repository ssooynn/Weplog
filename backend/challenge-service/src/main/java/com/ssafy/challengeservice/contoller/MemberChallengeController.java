package com.ssafy.challengeservice.contoller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("memberChallenge")
public class MemberChallengeController {

    @ApiOperation(value = "챌린지 참가")
    @PostMapping("/{challengeId}")
    public ResponseEntity<?> postChallengeApplication(@RequestHeader(value = "memberId") String memberId,
                                                      @PathVariable("challengeId") String challengeId) {
        return ResponseEntity.ok().build();
    }
}
