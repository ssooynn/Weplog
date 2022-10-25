package com.ssafy.weplog.domain.mysql.memberchallenge.service;

import com.ssafy.weplog.domain.mysql.challenge.dao.ChallengeRepository;
import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import com.ssafy.weplog.domain.mysql.member.dao.MemberRepository;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.domain.mysql.memberchallenge.dao.MemberChallengeRepository;
import com.ssafy.weplog.domain.mysql.memberchallenge.domain.MemberChallenge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberChallengeServiceImpl implements MemberChallengeService{

    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    @Override
    public void postChallengeApplication(UUID memberId, Long challengeId) {
        Member member = memberRepository.findById(memberId).get();
        Challenge challenge = challengeRepository.findById(challengeId).get();
        MemberChallenge memberChallenge = MemberChallenge.builder().member(member).challenge(challenge).build();
        memberChallengeRepository.save(memberChallenge);
    }
}
