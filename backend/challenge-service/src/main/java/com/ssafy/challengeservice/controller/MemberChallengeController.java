package com.ssafy.challengeservice.controller;

import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;
import com.ssafy.challengeservice.service.memberchallenge.MemberChallengeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("memberChallenge")
public class MemberChallengeController {

    private final MemberChallengeService memberChallengeService;

    @ApiOperation(value = "챌린지 참가")
    @PostMapping("/{challengeId}")
    public ResponseEntity<CreateChallengeRes> postChallengeApplication(@RequestHeader("memberId") String memberId,
                                                                       @PathVariable("challengeId") Long challengeId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(memberChallengeService.postChallengeApplication(UUID.fromString(memberId), challengeId));
    }

    @ApiOperation(value = "나의 진행중인 챌린지 리스트")
    @GetMapping("/challenging")
    public ResponseEntity<List<ChallengeRes>> getMyChallengingList(@RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(memberChallengeService.getMyChallengingList(UUID.fromString(memberId)));
    }

    @ApiOperation(value = "나의 끝난 챌린지 리스트")
    @GetMapping("/end")
    public ResponseEntity<List<ChallengeRes>> getMyEndChallengeList(@RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(memberChallengeService.getMyEndChallengeList(UUID.fromString(memberId)));
    }
}
