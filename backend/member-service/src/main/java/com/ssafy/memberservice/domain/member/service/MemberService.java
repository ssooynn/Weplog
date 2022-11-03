package com.ssafy.memberservice.domain.member.service;

import com.ssafy.memberservice.domain.member.dto.MemberReq;

import java.rmi.server.UID;
import java.util.UUID;

public interface MemberService {
    void updateMemberInfo(UUID id, MemberReq memberReq);
    boolean checkDoubleNickname(UUID id, String nickname);
    void postMyPet(Long id);
}
