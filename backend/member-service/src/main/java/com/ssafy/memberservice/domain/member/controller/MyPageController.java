package com.ssafy.memberservice.domain.member.controller;

import com.ssafy.memberservice.domain.member.service.MyPageService;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
	private final MyPageService myPageService;

	@ApiOperation(value = "내 최근 기록 리스트 조회")
	@GetMapping("/newChallenge")
	public ResponseEntity<?> getNewRecordList(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
		return null;
	}

	@ApiOperation(value = "내 끝난 챌린지 참여 리스트 조회")
	@GetMapping("/endChallenge")
	public ResponseEntity<?> getEndRecordList(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
		return null;
	}

	@ApiOperation(value = "내 끝난 챌린지 참여 상세 조회")
	@GetMapping("/endChallenge/{challengeId}")
	public ResponseEntity<?> getEndRecordDetail(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member, @PathVariable("challengeId") String challengeId) {
		return null;
	}

	@ApiOperation(value = "도전과제 리스트 조회")
	@GetMapping("/achievement")
	public ResponseEntity<?> getChallengeList() {
		return null;
	}

	@ApiOperation(value = "프로필 조회")
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
		return null;
	}

	@ApiOperation(value = "프로필 수정")
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
		return null;
	}

	@ApiOperation(value = "프로필 조회")
	@GetMapping("/bookmark")
	public ResponseEntity<?> getBookmarkList(@ApiIgnore @AuthenticationPrincipal CustomUserDetails member) {
		return null;
	}
}
