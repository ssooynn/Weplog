package com.ssafy.memberservice.domain.memberpet.service;

import com.ssafy.memberservice.domain.memberpet.dto.MemberPetRes;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.UUID;

public interface MemberPetService {
    public Slice<MemberPetRes> getMyPets(UUID userId);

    public void postMyPet(UUID id, Long petId);

    public List<Integer> getMyPetsKind(UUID id);

    MemberPetRes getMyPet(UUID id, Long petId);
}
