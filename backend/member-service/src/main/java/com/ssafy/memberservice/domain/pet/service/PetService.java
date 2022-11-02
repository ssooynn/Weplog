package com.ssafy.memberservice.domain.pet.service;

import com.ssafy.memberservice.domain.pet.dto.PetRes;

import java.util.List;

public interface PetService {

	public List<PetRes> getPetsByLevel(int level);

}
