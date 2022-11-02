package com.ssafy.memberservice.domain.pet.service;

import com.ssafy.memberservice.domain.pet.dao.PetRepository;
import com.ssafy.memberservice.domain.pet.dto.PetRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {


	private final PetRepository petRepository;


	@Override
	public List<PetRes> getPetsByLevel(int level) {
		List<PetRes> list = petRepository.getPetsByLevel(level).stream().map(m->new PetRes(m))
				.collect(Collectors.toList());
		return list;
	}


}
