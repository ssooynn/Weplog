package com.ssafy.challengeservice.service.memberchallenge;

import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;
import com.ssafy.challengeservice.global.common.error.exception.DuplicateException;
import com.ssafy.challengeservice.global.common.error.exception.NotFoundException;
import com.ssafy.challengeservice.repository.ChallengeRepository;
import com.ssafy.challengeservice.repository.MemberChallengeRepository;
import com.ssafy.challengeservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.challengeservice.global.common.error.exception.DuplicateException.DUPLICATE_CHALLENGE_TYPE;
import static com.ssafy.challengeservice.global.common.error.exception.NotFoundException.CHALLENGE_NOT_FOUND;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberChallengeServiceImpl implements MemberChallengeService{

    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    // 챌린지 참가하기
    @Override
    @Transactional
    public CreateChallengeRes postChallengeApplication(UUID memberId, Long challengeId) {
        Member member = memberRepository.findById(memberId).get();
        Challenge challenge = challengeRepository.findByChallengeIdWithLimit(challengeId)
                .orElseThrow(() -> new NotFoundException(CHALLENGE_NOT_FOUND));

        // 참가하려는 타입의 중복 타입 챌린지 참여 막기
        List<MemberChallenge> participationStatusAtType = memberChallengeRepository.findDuplicatedChallengeType(memberId, challenge.getChallengeType());
        if (participationStatusAtType.size() >= challenge.getChallengeType().getChallengeLimit().getMaxCnt()) {
            throw new DuplicateException(DUPLICATE_CHALLENGE_TYPE);
        }

        MemberChallenge memberChallenge = MemberChallenge.builder()
                .member(member)
                .challenge(challenge)
                .totalAmount(0L)
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();
        MemberChallenge save = memberChallengeRepository.save(memberChallenge);
        // 참가자 수 늘리기
        challenge.updateParticipantsCnt();

        return CreateChallengeRes.create(save.getChallenge().getId());
    }

    // 나의 진행중인 챌린지 리스트
    @Override
    public List<ChallengeRes> getMyChallengingList(UUID memberId) {
        List<MemberChallenge> myChallengingList = memberChallengeRepository.findByMemberIdWithChallengeInProgress(memberId);

        return myChallengingList.stream().map(memberChallenge -> ChallengeRes.create(memberChallenge.getChallenge()))
                .collect(Collectors.toList());
    }

    // 나의 끝난 챌린지 리스트
    @Override
    public List<ChallengeRes> getMyEndChallengeList(UUID memberId) {
        List<MemberChallenge> myEndList = memberChallengeRepository.findByMemberIdWithChallengeEnd(memberId);

        return myEndList.stream().map(memberChallenge -> ChallengeRes.create(memberChallenge.getChallenge()))
                .collect(Collectors.toList());
    }
}
