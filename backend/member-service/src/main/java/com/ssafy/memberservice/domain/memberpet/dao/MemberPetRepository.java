package com.ssafy.memberservice.domain.memberpet.dao;

import com.ssafy.memberservice.domain.memberpet.domain.MemberPet;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberPetRepository extends JpaRepository<MemberPet, Long> {
    @Query("select m from MemberPet m where m.member.id=:id")
    Slice<MemberPet> getMemberPetsByMemberId(UUID id);

    @Query("select m.pet.id from MemberPet m where m.member.id =:id")
    List<Long> getMemberPetsByKind(UUID id);

    @Query("select m from MemberPet m where m.member.id=:id and m.pet.id=:petId")
    MemberPet getMemberPetByMemberId(UUID id, Long petId);

    @Query("select mp from MemberPet mp where mp.member.id = :memberId and mp.currentLevel = 1")
    Optional<MemberPet> findGrowingPetByMemberId(UUID memberId);
}
