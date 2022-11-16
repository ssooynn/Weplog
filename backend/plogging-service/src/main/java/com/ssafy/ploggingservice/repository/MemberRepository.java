package com.ssafy.ploggingservice.repository;

import com.ssafy.ploggingservice.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
}
