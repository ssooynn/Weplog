package com.ssafy.memberservice.domain.memberdetail.controller;

import com.ssafy.memberservice.domain.memberdetail.dto.MyPageRes;
import com.ssafy.memberservice.domain.memberdetail.service.MyPageService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {
	private final MyPageService myPageService;

	@ApiOperation(value = "프로필 메인 조회")
	@GetMapping()
	public ResponseEntity<?> getProfileDetail(@ApiIgnore @RequestHeader("memberId")String memberId){
		return new ResponseEntity<>(myPageService.getMyPageDetail(UUID.fromString(memberId)), HttpStatus.OK);
	}

	@ApiOperation(value = "프로필 조회")
	@GetMapping("/profile")
	public ResponseEntity<MyPageRes> getProfile(@ApiIgnore @RequestHeader("memberId")String memberId) {
		return new ResponseEntity<>(myPageService.getMyPage(UUID.fromString(memberId)), HttpStatus.OK);
	}

	@ApiOperation(value = "프로필 수정", notes= "아직 구현 안함")
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(@ApiIgnore @RequestHeader("memberId") UUID memberId) {
		return null;
	}


}
