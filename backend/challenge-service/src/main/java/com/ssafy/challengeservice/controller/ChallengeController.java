package com.ssafy.challengeservice.controller;

import com.ssafy.challengeservice.dto.ChallengeDetailRes;
import com.ssafy.challengeservice.dto.ChallengeRankingDto;
import com.ssafy.challengeservice.dto.ChallengeReq;
import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;
import com.ssafy.challengeservice.global.common.base.CacheKey;
import com.ssafy.challengeservice.service.challenge.ChallengeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.UUID;

import static com.ssafy.challengeservice.global.common.base.CacheKey.CHALLENGE_RANKING;

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
	public ResponseEntity<CreateChallengeRes> postChallenge(@RequestPart ChallengeReq request, @RequestPart MultipartFile image,
															@RequestHeader("memberId") String memberId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(challengeService.postChallenge(request, image, memberId));
	}

	@ApiOperation(value = "챌린지 포기")
	@DeleteMapping("/{challengeId}")
	public ResponseEntity<?> deleteChallenge(@RequestHeader("memberId") String memberId,
											 @PathVariable("challengeId") Long challengeId) {
		challengeService.deleteChallenge(challengeId, UUID.fromString(memberId));
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "나의 챌린지 조회")
	@GetMapping("/my")
	public ResponseEntity<Slice<ChallengeRes>> getMyChallengeList(@RequestHeader("memberId") String memberId,
																  Pageable pageable) {
		Slice<ChallengeRes> res = challengeService.getMyChallengeList(UUID.fromString(memberId), pageable);
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 제목으로 조회")
	@GetMapping("/search/{title}")
	public ResponseEntity<Slice<ChallengeRes>> getChallengeBySearch(@PathVariable("title") String title, Pageable pageable) {
		return new ResponseEntity<>(challengeService.getChallengeBySearch(title, pageable), HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 상세 조회")
	@GetMapping("/{challengeId}")
	public ResponseEntity<ChallengeDetailRes> getChallengeDetail(@PathVariable("challengeId") Long challengeId,
																 @RequestHeader(value = "memberId") String memberId) {
		return new ResponseEntity<>(challengeService.getChallengeDetail(challengeId, UUID.fromString(memberId)), HttpStatus.OK);
	}

	@ApiOperation(value = "챌린지 내부 랭킹 조회")
	@GetMapping("/rank/{challengeId}")
//	@Cacheable(value = CHALLENGE_RANKING, key = "#challengeId", unless = "#result == null", cacheManager = "cacheManager")
	public ResponseEntity<List<ChallengeRankingDto>> getRankInChallenge(@PathVariable("challengeId") Long challengeId) {
		return ResponseEntity.ok(challengeService.getRankChallenge(challengeId));
	}

	@ApiOperation(value = "현 시간 기준 종료시간 끝난 챌린지 종료시키기(임시)")
	@PostMapping("/end")
	public ResponseEntity finishChallenge() {
		challengeService.finishChallenge();

		return ResponseEntity.ok().build();
	}
}
