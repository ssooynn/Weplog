package com.ssafy.weplog.domain.mysql.pet.service;

import java.util.List;

import com.ssafy.weplog.domain.mysql.member.dao.MemberRepository;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.domain.mysql.memberpet.dao.MemberPetRepository;
import com.ssafy.weplog.domain.mysql.memberpet.domain.MemberPet;
import com.ssafy.weplog.domain.mysql.pet.dao.PetRepository;
import com.ssafy.weplog.domain.mysql.pet.dto.PetReq;
import com.ssafy.weplog.domain.mysql.pet.dto.PetRes;
import org.springframework.stereotype.Service;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {

	private static PetRepository petRepository;
	private static MemberRepository memberRepository;
	private static MemberPetRepository memberPetRepository;

	@Override
	public List<PetRes> getPetsByLevel(int level) {

		return null;
	}


}
