package com.ssafy.memberservice.domain.member.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.member.dto.MemberReq;
import com.ssafy.memberservice.global.common.error.exception.NotExistException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public void updateMemberInfo(UUID id, MemberReq memberReq) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotExistException("해당 아이디가 존재하지 않습니다."));
        member.updateMember(memberReq);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean checkDoubleNickname(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isPresent();
    }

    @Override
    public void postMyPet(UUID memberId, Long petId) {

    }
}
