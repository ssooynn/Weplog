package com.ssafy.memberservice.domain.memberdetail.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.memberdetail.dao.MemberDetailRepository;
import com.ssafy.memberservice.domain.memberdetail.domain.MemberDetail;
import com.ssafy.memberservice.domain.memberdetail.dto.MyPageDetailRes;
import com.ssafy.memberservice.domain.memberdetail.dto.MyPageRes;
import com.ssafy.memberservice.domain.memberpet.dao.MemberPetRepository;
import com.ssafy.memberservice.domain.memberpet.dao.domain.MemberPet;

import com.ssafy.memberservice.domain.memberdetail.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageServiceImpl implements MyPageService {
    private final MemberDetailRepository memberDetailRepository;
    private final MemberRepository memberRepository;
    private final MemberPetRepository memberPetRepository;
    @Override
    public MyPageDetailRes getMyPageDetail(UUID uuid) {
        MemberDetail memberDetail = memberDetailRepository.findByUUId(uuid);
        return new MyPageDetailRes(memberDetail);
    }

    @Override
    public MyPageRes getMyPage(UUID uuid) {
        Optional<Member> member = memberRepository.findById(uuid);
        Optional<MemberPet> memberPet = memberPetRepository.findGrowingPetByMemberId(uuid);
        if (member.isPresent() && memberPet.isPresent()){
            System.out.println(member);
            return new MyPageRes(member.get(), memberPet.get());
        }
        return new MyPageRes();
    }

    @Override
    public TotalRankingResponse getTotalRanking() {
        List<TotalRankingDistanceInterface> totalRankingDistance = memberDetailRepository.findTotalRankingDistance();
        List<TotalRankingTimeInterface> totalRankingTime = memberDetailRepository.findTotalRankingTime();
        List<TotalRankingCntInterface> totalRankingCnt = memberDetailRepository.findTotalRankingCnt();

        return TotalRankingResponse.create(totalRankingDistance, totalRankingTime, totalRankingCnt);
    }
}
