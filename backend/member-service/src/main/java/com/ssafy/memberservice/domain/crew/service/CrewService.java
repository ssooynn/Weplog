package com.ssafy.memberservice.domain.crew.service;

import com.ssafy.memberservice.domain.crew.dto.*;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingResponse;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CrewService {
    CreateCrewResponse createCrew(CreateCrewRequest request, MultipartFile image, UUID memberId);

    CreateCrewResponse signCrew(UUID fromString, Long crewId, SignCrewRequest request);

    void accessJoinCrew(UUID memberId, Long joinWaitingId);

    List<JoinWaiterDto> getCrewJoinWaiters(Long crewId);

    CrewDetailInfoResponse getCrewDetailInfo(Long crewId, UUID memberId);

    List<CrewSimpleResponse> getCrewList();

    Top3CrewResponse getTop3CrewList();

    List<CrewSimpleResponse> getCrewListNear(Double lat, Double lon);

    List<CrewSimpleResponse> getMyCrewList(UUID memberId);

    void denyJoinCrew(UUID fromString, Long joinWaitingId);

    TotalRankingResponse getCrewLanking(Long crewId);
}
