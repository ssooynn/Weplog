package com.ssafy.weplog.domain.mysql.memberpet.dao;

import com.ssafy.weplog.domain.mysql.memberpet.domain.MemberPet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberPetRepository extends JpaRepository<MemberPet, Long> {
}
