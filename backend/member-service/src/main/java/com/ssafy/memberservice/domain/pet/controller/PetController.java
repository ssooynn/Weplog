package com.ssafy.memberservice.domain.pet.controller;

import com.ssafy.memberservice.domain.pet.service.PetService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
