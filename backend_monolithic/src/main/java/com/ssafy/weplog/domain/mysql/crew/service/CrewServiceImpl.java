package com.ssafy.weplog.domain.mysql.crew.service;

import com.ssafy.weplog.domain.mysql.crew.dao.CrewRepository;
import com.ssafy.weplog.domain.mysql.crew.domain.Crew;
import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewRequest;
import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewResponse;
import com.ssafy.weplog.domain.mysql.member.dao.MemberRepository;
import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.global.common.error.exception.NotFoundException;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import com.ssafy.weplog.infra.s3.S3Upload;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.weplog.global.common.error.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class CrewServiceImpl implements CrewService {

    private final CrewRepository crewRepository;
    private final MemberRepository memberRepository;
    private final S3Upload s3Upload;

    // 크루 생성하기
    @Override
    public CreateCrewResponse createCrew(CreateCrewRequest request, MultipartFile image, CustomUserDetails member) {
        Member findMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        String imageUrl = s3Upload.uploadImageToS3(image);
        Crew saveCrew = crewRepository.save(Crew.createCrew(request, imageUrl, findMember));

        return CreateCrewResponse.from(saveCrew.getId());
    }
}
