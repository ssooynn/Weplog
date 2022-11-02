package com.ssafy.memberservice.domain.membercrew.dao;

import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCrewRepository extends JpaRepository<MemberCrew, Long> {
}
