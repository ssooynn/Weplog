package com.ssafy.memberservice.domain.member.service;

import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.member.dto.MemberReq;
import org.springframework.web.multipart.MultipartFile;

import java.rmi.server.UID;
import java.util.UUID;

public interface MemberService {
    Member updateMemberInfo(UUID id, MemberReq memberReq, MultipartFile image);
    boolean checkDoubleNickname(String nickname);
    void postMyPet(UUID memberId, Long petId);
}
