package com.ssafy.memberservice.domain.memberdetail.dao;

import com.ssafy.weplog.domain.mysql.memberdetail.domain.MemberDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberDetailRepository extends JpaRepository<MemberDetail, Long> {
}
