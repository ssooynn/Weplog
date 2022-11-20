package com.ssafy.achievementservice.repository;

import com.ssafy.achievementservice.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
}
