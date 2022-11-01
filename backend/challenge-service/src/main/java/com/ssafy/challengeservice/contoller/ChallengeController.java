package com.ssafy.challengeservice.contoller;

import com.ssafy.challengeservice.dto.ChallengeReq;
import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.service.ChallengeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("challenge")
public class ChallengeController {

	private final ChallengeService challengeService;

	@ApiOperation(value = "챌린지 목록조회")
	@GetMapping()
	public ResponseEntity<Slice<ChallengeRes>> getChallengeList(Pageable pageable) {
		return new ResponseEntity<>(challengeService.getChallengeList(pageable), HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 생성")
	@PostMapping()
	public ResponseEntity<?> postChallenge(@RequestBody ChallengeReq challengeReq) {
		challengeService.postChallenge(challengeReq);
		return ResponseEntity.ok().build();
	}



	@ApiOperation(value = "챌린지 포기")
	@DeleteMapping("/{challengeId")
	public ResponseEntity<?> deleteChallenge(@RequestHeader(value = "memberId") String memberId,
											 @PathVariable("challengeId") Long challengeId) {
		challengeService.deleteChallenge(challengeId);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "나의 챌린지 조회")
	@GetMapping("/my")
	public ResponseEntity<Slice<ChallengeRes>> getMyChallengeList(@RequestHeader(value = "memberId") String memberId, Pageable pageable) {
		Slice<ChallengeRes> res = challengeService.getMyChallengeList(memberId, pageable);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 제목으로 조회")
	@GetMapping("/search/{title}")
	public ResponseEntity<Slice<ChallengeRes>> getChallengeBySearch(@PathVariable("title") String title, Pageable pageable) {
		return new ResponseEntity<>(challengeService.getChallengeBySearch(title, pageable), HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 상세 조회")
	@GetMapping("/{challengeId}")
	public ResponseEntity<?> getChallengeDetail(@PathVariable("challengeId") Long challengeId) {
		return new ResponseEntity<>(challengeService.getChallengeDetail(challengeId), HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 내부 랭킹 조회")
	@GetMapping("/rank/{challengeId}")
	public ResponseEntity<?> getRankInChallenge(@PathVariable("challengeId") String challengeId) {
		return null;
	}
}
