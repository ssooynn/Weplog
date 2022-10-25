package com.ssafy.weplog.domain.mysql.memberpet.dao;

import com.ssafy.weplog.domain.mysql.memberpet.domain.MemberPet;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberPetRepository extends JpaRepository<MemberPet, Long> {
    @Query("select m from MemberPet m where m.member.id=:id")
    Slice<MemberPet> getMemberPetsByMemberId(String id);

    @Query("select m.pet.id from MemberPet m where m.member.id =:id")
    List<Long> getMemberPetsByKind(String id);

    @Query("select m from MemberPet m where m.member.id=:id and m.pet.id=:petId")
    MemberPet getMemberPetByMemberId(String id, String petId);
}
