package com.ssafy.weplog.domain.mysql.memberpet.service;

import com.ssafy.weplog.domain.mysql.memberpet.dto.MemberPetRes;
import com.ssafy.weplog.domain.mysql.pet.dto.PetRes;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface MemberPetService {
    public Slice<MemberPetRes> getMyPets(String userId);

    public void postMyPet(Long petId, String id);
    public List<Integer> getMyPetsKind(String id);

    MemberPetRes getMyPet(String id, String petId);
}
