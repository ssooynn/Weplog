package com.ssafy.memberservice.domain.member.dto.memberdetail.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.member.dto.memberdetail.dao.MemberDetailRepository;
import com.ssafy.memberservice.domain.member.dto.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.domain.member.dto.memberdetail.dto.MyPageDetailRes;
import com.ssafy.memberservice.domain.member.dto.memberdetail.dto.MyPageRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {
    private final MemberDetailRepository memberDetailRepository;
    private final MemberRepository memberRepository;
    @Override
    public MyPageDetailRes getMyPageDetail(UUID uuid) {
        MemberDetail memberDetail = memberDetailRepository.findByUUId(uuid);
        return new MyPageDetailRes(memberDetail);
    }

    @Override
    public MyPageRes getMyPage(UUID uuid) {
        Member member = memberRepository.findById(uuid).get();
        return new MyPageRes(member);
    }
}
