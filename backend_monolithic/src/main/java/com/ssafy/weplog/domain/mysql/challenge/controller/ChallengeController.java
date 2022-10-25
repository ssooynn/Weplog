package com.ssafy.weplog.domain.mysql.challenge.controller;

import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeReq;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ssafy.weplog.domain.mysql.challenge.service.ChallengeService;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("challenge")
public class ChallengeController {

	private final ChallengeService challengeService;

	@ApiOperation(value = "챌린지 목록조회")
	@PostMapping()
	public ResponseEntity<Slice<ChallengeRes>> getChallengeList(Pageable pageable) {

		return null;
	}

	@ApiOperation(value = "챌린지 생성")
	@PostMapping()
	public ResponseEntity<?> postChallenge(@RequestBody ChallengeReq challengeReq) {
		challengeService.postChallenge(challengeReq);
		return ResponseEntity.ok().build();
	}



	@ApiOperation(value = "챌린지 포기")
	@DeleteMapping("/{challengeId")
	public ResponseEntity<?> deleteChallenge(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member,
											 @PathVariable("challengeId") Long challengeId) {
		challengeService.deleteChallenge(challengeId);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "나의 챌린지 조회")
	@GetMapping("/my")
	public ResponseEntity<Slice<ChallengeRes>> getMyChallengeList(@ApiIgnore @AuthenticationPrincipal CustomUserDetails
																			  member, Pageable pageable) {
		Slice<ChallengeRes> res = challengeService.getMyChallengeList(pageable);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 제목으로 조회")
	@GetMapping("/search/{title}")
	public ResponseEntity<?> getChallengeBySearch(@PathVariable("title") String title, Pageable pageable) {
		return null;
	}

	@ApiOperation(value = "챌린지 상세 조회")
	@GetMapping("/{challengeId}")
	public ResponseEntity<?> getChallengeDetail(@PathVariable("challengeId") String challengeId) {
		return null;
	}

	@ApiOperation(value = "챌린지 내부 랭킹 조회")
	@GetMapping("/rank/{challengeId}")
	public ResponseEntity<?> getRankInChallenge(@PathVariable("challengeId") String challengeId) {
		return null;
	}

	@ApiOperation(value = "챌린지 내부 피드 리스트 조회")
	@GetMapping("feed/{challengeId}")
	public ResponseEntity<?> getFeedInChallenge(@PathVariable("challengeId") String challengeId) {
		return null;
	}

}
