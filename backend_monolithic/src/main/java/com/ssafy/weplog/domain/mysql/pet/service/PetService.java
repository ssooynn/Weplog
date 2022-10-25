package com.ssafy.weplog.domain.mysql.pet.service;

import java.util.List;
import java.util.UUID;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;
import com.ssafy.weplog.domain.mysql.pet.dto.PetReq;
import com.ssafy.weplog.domain.mysql.pet.dto.PetRes;

public interface PetService {

	public List<PetRes> getPetsByLevel(int level);

}
