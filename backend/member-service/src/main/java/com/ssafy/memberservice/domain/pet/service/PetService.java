package com.ssafy.memberservice.domain.pet.service;

import com.ssafy.memberservice.domain.pet.dto.PetRes;

import java.util.List;

public interface PetService {

	List<PetRes> getPetsByLevel(int level);
	PetRes getPetInfo(Long petId);
}
