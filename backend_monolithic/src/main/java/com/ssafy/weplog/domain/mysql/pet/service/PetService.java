package com.ssafy.weplog.domain.mysql.pet.service;

import java.util.List;
import java.util.UUID;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;

public interface PetService {
	public List<Pet> getMyPets(UUID userId);
	public List<Pet> getPetsByLevel(int level);
}
