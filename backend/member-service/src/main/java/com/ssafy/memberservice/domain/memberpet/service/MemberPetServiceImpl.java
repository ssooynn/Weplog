package com.ssafy.memberservice.domain.memberpet.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.memberpet.dao.MemberPetRepository;
import com.ssafy.memberservice.domain.memberpet.dao.domain.MemberPet;
import com.ssafy.memberservice.domain.memberpet.dto.MemberPetRes;
import com.ssafy.memberservice.domain.pet.dao.PetRepository;
import com.ssafy.memberservice.domain.pet.domain.Pet;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import com.ssafy.memberservice.global.common.error.exception.NotMatchException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.memberservice.global.common.error.exception.DuplicateException.GROWING_PET_DUPLICATED;
import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.MEMBER_PET_NOT_FOUND;
import static com.ssafy.memberservice.global.common.error.exception.NotMatchException.PET_MAX_LEVEL_NOT_MATCH;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberPetServiceImpl implements MemberPetService{

    private final PetRepository petRepository;
    private final MemberRepository memberRepository;
    private final MemberPetRepository memberPetRepository;
    @Override
    public List<MemberPetRes> getMyPets(UUID userId) {
        List<MemberPetRes> list = memberPetRepository.getMemberPetsByMemberId(userId)
                .stream().map(memberPet -> new MemberPetRes(memberPet))
                .collect(Collectors.toList());
        return list;
    }

    @Override
    public MemberPetRes getMyPet(UUID id, Long petId) {
        MemberPet memberPet = memberPetRepository.getMemberPetByMemberId(id, petId);
        return new MemberPetRes(memberPet);
    }

    @Override
    @Transactional
    public Long transformMyPetImage(Long memberPetId) {
        MemberPet findMemberPet = memberPetRepository.findByIdWithPet(memberPetId)
                .orElseThrow(() -> new NotFoundException(MEMBER_PET_NOT_FOUND));

        // 만렙 아니면 변신 못함.
        if (findMemberPet.getCurrentLevel() != 2) {
            throw new NotMatchException(PET_MAX_LEVEL_NOT_MATCH);
        }

        // 지금 키우는 플로몬 종류 가져오기
        List<Pet> petInfo = petRepository.findPetByCategory(findMemberPet.getName());
        // image 업데이트
        findMemberPet.updateImage(petInfo);

        return memberPetId;
    }

    @Override
    @Transactional
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
