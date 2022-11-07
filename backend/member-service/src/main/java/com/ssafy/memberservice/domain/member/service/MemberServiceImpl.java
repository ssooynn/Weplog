package com.ssafy.memberservice.domain.member.service;

import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.member.dto.MemberReq;
import com.ssafy.memberservice.global.common.error.exception.NotExistException;
import com.ssafy.memberservice.infra.s3.S3Upload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final S3Upload s3Upload;

    @Override
    @Transactional
    public Member updateMemberInfo(UUID id, MemberReq memberReq, MultipartFile image) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new NotExistException("해당 아이디가 존재하지 않습니다."));
        String profileImageUrl = s3Upload.uploadImageToS3(image);
        member.updateMember(memberReq, profileImageUrl);

        return member;
    }

    @Transactional(readOnly = true)
    @Override
    public boolean checkDoubleNickname(String nickname) {
        log.info("서비스 들어옴" + nickname);
        Optional<Member> member = memberRepository.findByNickname(nickname);
        log.info("레포지토리 조회함" + member);
        return member.isPresent();
    }

    @Override
    public void postMyPet(UUID memberId, Long petId) {

    }
}
