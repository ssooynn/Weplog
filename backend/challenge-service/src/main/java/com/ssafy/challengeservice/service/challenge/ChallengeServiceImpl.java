package com.ssafy.challengeservice.service.challenge;


import com.ssafy.challengeservice.domain.challenge.Challenge;
import com.ssafy.challengeservice.domain.challengetype.ChallengeType;
import com.ssafy.challengeservice.domain.member.Member;
import com.ssafy.challengeservice.domain.memberchallenge.MemberChallenge;
import com.ssafy.challengeservice.dto.ChallengeDetailRes;
import com.ssafy.challengeservice.dto.ChallengeReq;
import com.ssafy.challengeservice.dto.ChallengeRes;
import com.ssafy.challengeservice.dto.response.CreateChallengeRes;
import com.ssafy.challengeservice.global.common.error.exception.DuplicateException;
import com.ssafy.challengeservice.global.common.error.exception.NotExistException;
import com.ssafy.challengeservice.global.common.error.exception.NotFoundException;
import com.ssafy.challengeservice.infra.s3.S3Upload;
import com.ssafy.challengeservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

import static com.ssafy.challengeservice.global.common.error.exception.DuplicateException.DUPLICATE_CHALLENGE_TYPE;
import static com.ssafy.challengeservice.global.common.error.exception.NotExistException.NO_EXIST_MEMBER_CHALLENGE;
import static com.ssafy.challengeservice.global.common.error.exception.NotFoundException.CHALLENGE_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChallengeServiceImpl implements ChallengeService{

    private final ChallengeRepository challengeRepository;
    private final ChallengeTypeRepository challengeTypeRepository;
    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final S3Upload s3Upload;
    private final ChallengeLimitRepository challengeLimitRepository;

    // 챌린지 생성
    @Override
    @Transactional
    public CreateChallengeRes postChallenge(ChallengeReq challengeReq, MultipartFile image, String memberId) {
        ChallengeType challengeType = challengeTypeRepository.findChallengeTypeByTypeName(challengeReq.getType()).get();
        Member findMember = memberRepository.findById(UUID.fromString(memberId)).get();

        // 만드는 챌린지의 타입이 이미 참여한 타입의 챌린지 수를 초과했는지 체크
        // 참가하려는 타입의 중복 타입 챌린지 참여 막기
        List<MemberChallenge> participationStatusAtType = memberChallengeRepository.findDuplicatedChallengeType(UUID.fromString(memberId), challengeType);
        if (participationStatusAtType.size() >= challengeType.getChallengeLimit().getMaxCnt()) {
            throw new DuplicateException(DUPLICATE_CHALLENGE_TYPE);
        }


        String imageUrl = s3Upload.uploadImageToS3(image);

        // 챌린지 저장
        Challenge saveChallenge = challengeRepository.save(challengeReq.toEntity(challengeType, findMember, imageUrl));

        // 챌린지에 참가
        MemberChallenge participateChallenge = MemberChallenge.builder()
                .member(findMember)
                .challenge(saveChallenge)
                .build();
        memberChallengeRepository.save(participateChallenge);
        saveChallenge.updateParticipantsCnt();

        return CreateChallengeRes.create(saveChallenge.getId());
    }

    @Override
    @Transactional
    public void deleteChallenge(Long challengeId, String memberId) {
        MemberChallenge memberChallenge = memberChallengeRepository.findByChallengeIdAndMemberId(challengeId, UUID.fromString(memberId))
                .orElseThrow(() -> new NotExistException(NO_EXIST_MEMBER_CHALLENGE));

        memberChallengeRepository.delete(memberChallenge);
        memberChallenge.getChallenge().exitChallenge();
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
        Challenge challenge = challengeRepository.findByIdWithMember(id)
                .orElseThrow(() -> new NotFoundException(CHALLENGE_NOT_FOUND));

        return ChallengeDetailRes.from(challenge);
    }

    // end time 끝난 챌린지 종료시키기
    @Override
    @Transactional
    public void finishChallenge() {
        // 끝나야 할 챌린지 조회;
        List<Challenge> finishChallengeList = challengeRepository.findAllMustFinishChallenge();

        // 챌린지 finishFlag = true로 update
        challengeRepository.updateFinishChallenge();

        // redis에 있는 랭킹 데이터 mysql에 넣기
        for (Challenge challenge : finishChallengeList) {

        }

    }
}
