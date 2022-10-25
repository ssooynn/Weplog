package com.ssafy.weplog.domain.mysql.pet.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {
	@Override
	public List<Pet> getMyPets(UUID userId) {
		return null;
	}

	@Override
	public List<Pet> getPetsByLevel(int level) {
		return null;
	}
}
