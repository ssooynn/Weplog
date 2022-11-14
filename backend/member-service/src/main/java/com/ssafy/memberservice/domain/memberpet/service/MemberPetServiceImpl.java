package com.ssafy.memberservice.domain.memberpet.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.memberpet.dao.MemberPetRepository;
import com.ssafy.memberservice.domain.memberpet.dao.domain.MemberPet;
import com.ssafy.memberservice.domain.memberpet.dto.MemberPetRes;
import com.ssafy.memberservice.domain.pet.dao.PetRepository;
import com.ssafy.memberservice.domain.pet.domain.Pet;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotMatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.memberservice.global.common.error.exception.DuplicateException.GROWING_PET_DUPLICATED;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberPetServiceImpl implements MemberPetService{

    private final PetRepository petRepository;
    private final MemberRepository memberRepository;
    private final MemberPetRepository memberPetRepository;
    @Override
    public Slice<MemberPetRes> getMyPets(UUID userId) {
        Slice<MemberPetRes> list = memberPetRepository.getMemberPetsByMemberId(userId).map(MemberPetRes::new);
        return list;
    }

    @Override
    public MemberPetRes getMyPet(UUID id, Long petId) {
        MemberPet memberPet = memberPetRepository.getMemberPetByMemberId(id, petId);
        return new MemberPetRes(memberPet);
    }

    @Override
    public void postMyPet(UUID id, Long petId) {
        Pet pet = petRepository.findById(petId).get();
        Member member = memberRepository.findById(id).get();

        Optional<MemberPet> findGrowingPet = memberPetRepository.findGrowingPetByMemberId(id);
        if (findGrowingPet.isPresent()) {
            throw new DuplicateException(GROWING_PET_DUPLICATED);
        }

        memberPetRepository.save(new MemberPet(member, pet));
    }

    @Override
    public List<Integer> getMyPetsKind(UUID userId) {
        return memberPetRepository.getMemberPetsByKind(userId).stream()
                .map(Long::intValue)
                .collect(Collectors.toList());
    }


}
