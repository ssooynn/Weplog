package com.ssafy.weplog.domain.mysql.membercrew.dao;

import com.ssafy.weplog.domain.mysql.membercrew.domain.MemberCrew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCrewRepository extends JpaRepository<MemberCrew, Long> {
}
