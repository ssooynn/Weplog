package com.ssafy.weplog.domain.mysql.memberpet.service;

import com.ssafy.weplog.domain.mysql.member.dao.MemberRepository;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.domain.mysql.memberpet.dao.MemberPetRepository;
import com.ssafy.weplog.domain.mysql.memberpet.domain.MemberPet;
import com.ssafy.weplog.domain.mysql.memberpet.dto.MemberPetRes;
import com.ssafy.weplog.domain.mysql.pet.controller.dao.PetRepository;
import com.ssafy.weplog.domain.mysql.pet.domain.Pet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberPetServiceImpl implements MemberPetService{

    private final PetRepository petRepository;
    private final MemberRepository memberRepository;
    private final MemberPetRepository memberPetRepository;
    @Override
    public Slice<MemberPetRes> getMyPets(String userId) {
        Slice<MemberPetRes> list = memberPetRepository.getMemberPetsByMemberId(userId).map(m-> new MemberPetRes(m));
        return list;
    }

    @Override
    public MemberPetRes getMyPet(String id, String petId) {
        MemberPet memberPet = memberPetRepository.getMemberPetByMemberId(id, petId);
        return new MemberPetRes(memberPet);
    }

    @Override
    public void postMyPet(Long petId, String id) {
        Pet pet = petRepository.findById(petId).get();
        Member member = memberRepository.findById(id).get();
        memberPetRepository.save(new MemberPet(member, pet));
        return;
    }

    @Override
    public List<Integer> getMyPetsKind(String userId) {
        List<Integer> list = memberPetRepository.getMemberPetsByKind(userId).stream()
                .map(m -> m.intValue())
                .collect(Collectors.toList());
        return list;
    }


}
