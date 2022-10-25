package com.ssafy.weplog.domain.mysql.pet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import com.ssafy.weplog.domain.mysql.pet.service.PetService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pet")
public class PetController {

	private final PetService petService;

	@ApiOperation(value = "레벨별 펫 조회")
	@GetMapping("/{level}")
	public ResponseEntity<?> getPetsByLevel(@PathVariable("level") int level) {
		return ResponseEntity.ok(petService.getPetsByLevel(level));
	}

}
