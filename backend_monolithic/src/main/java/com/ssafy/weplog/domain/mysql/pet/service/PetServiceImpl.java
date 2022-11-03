package com.ssafy.weplog.domain.mysql.pet.service;

import java.util.List;

import java.util.stream.Collectors;


import com.ssafy.weplog.domain.mysql.pet.controller.dao.PetRepository;
import com.ssafy.weplog.domain.mysql.pet.dto.PetRes;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
