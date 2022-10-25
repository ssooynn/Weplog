package com.ssafy.weplog.domain.mysql.challenge.service;

import com.ssafy.weplog.domain.mysql.challenge.dao.ChallengeRepository;
import com.ssafy.weplog.domain.mysql.challenge.domain.Challenge;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeDetailRes;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeReq;
import com.ssafy.weplog.domain.mysql.challenge.dto.ChallengeRes;
import com.ssafy.weplog.domain.mysql.challengetype.dao.ChallengeTypeRepository;
import com.ssafy.weplog.domain.mysql.challengetype.domain.ChallengeType;
import com.ssafy.weplog.domain.mysql.memberchallenge.dao.MemberChallengeRepository;
import com.ssafy.weplog.domain.mysql.memberchallenge.domain.MemberChallenge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{

    private final ChallengeRepository challengeRepository;
    private final ChallengeTypeRepository challengeTypeRepository;
    private final MemberChallengeRepository memberChallengeRepository;

    @Override
    public void postChallenge(ChallengeReq challengeReq) {
        ChallengeType challengeType = challengeTypeRepository.findById(challengeReq.getChallengeTypeId()).get();
        Challenge challenge = challengeReq.toEntity(challengeType);
        challengeRepository.save(challenge);
        return;
    }

    @Override
    public void deleteChallenge(Long id) {
        challengeRepository.deleteById(id);
        return;
    }

    @Override
    public Slice<ChallengeRes> getChallengeList(Pageable pageable) {
        Slice<ChallengeRes> slice = challengeRepository.getChallengeList(pageable).map(m -> new ChallengeRes(m));
        return slice;
    }

    @Override
    public Slice<ChallengeRes> getMyChallengeList(String id, Pageable pageable) {
        Slice<ChallengeRes> slice = challengeRepository.getChallengeByID(id, pageable).map(m->new ChallengeRes(m));
        return slice;
    }

    @Override
    public Slice<ChallengeRes> getChallengeBySearch(String title, Pageable pageable) {
        Slice<ChallengeRes> slice = challengeRepository.getChallengeByTitle(title, pageable)
                .map(m ->new ChallengeRes(m));
        return slice;
    }

    @Override
    public ChallengeDetailRes getChallengeDetail(Long id) {
        Challenge challenge = challengeRepository.findById(id).get();
        int totalCnt = memberChallengeRepository.getParticipantsCnt(id);
        Long totalDist = 0L;
        return ChallengeDetailRes.builder()
                .challenge(challenge)
                .totalCnt(totalCnt)
                .totalDist(totalDist)
                .build();
    }
}
