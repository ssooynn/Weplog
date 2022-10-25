package com.ssafy.weplog.domain.mysql.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.weplog.domain.mysql.member.service.MyPageService;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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
