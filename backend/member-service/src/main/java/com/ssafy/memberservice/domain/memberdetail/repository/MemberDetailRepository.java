package com.ssafy.memberservice.domain.memberdetail.repository;

import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Long> {

    @Query("select m from MemberDetail m where m.member.id = :uuid")
    MemberDetail findByUUId(UUID uuid);
}
