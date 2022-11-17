package com.ssafy.memberservice.domain.crew.service;

import com.ssafy.memberservice.domain.chatting.service.CrewChatService;
import com.ssafy.memberservice.domain.crew.dao.CrewRepository;
import com.ssafy.memberservice.domain.crew.domain.Crew;
import com.ssafy.memberservice.domain.crew.dto.*;
import com.ssafy.memberservice.domain.joinwaiting.dao.JoinWaitingRepository;
import com.ssafy.memberservice.domain.joinwaiting.domain.JoinWaiting;
import com.ssafy.memberservice.domain.member.dao.MemberRepository;
import com.ssafy.memberservice.domain.member.domain.Member;
import com.ssafy.memberservice.domain.membercrew.dao.MemberCrewRepository;
import com.ssafy.memberservice.domain.membercrew.domain.MemberCrew;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingCntInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingDistanceInterface;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingResponse;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingTimeInterface;
import com.ssafy.memberservice.domain.notification.service.NotificationService;
import com.ssafy.memberservice.global.common.error.exception.DuplicateException;
import com.ssafy.memberservice.global.common.error.exception.NotFoundException;
import com.ssafy.memberservice.global.common.error.exception.NotMatchException;
import com.ssafy.memberservice.infra.s3.S3Upload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ssafy.memberservice.global.common.error.exception.DuplicateException.CREW_MEMBER_DUPLICATED;
import static com.ssafy.memberservice.global.common.error.exception.DuplicateException.JOIN_CREW_DUPLICATED;
import static com.ssafy.memberservice.global.common.error.exception.NotFoundException.*;
import static com.ssafy.memberservice.global.common.error.exception.NotMatchException.CREW_KING_NOT_MATCH;
import static com.ssafy.memberservice.global.common.error.exception.NotMatchException.CREW_MAX_PARTICIPANT_CNT_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CrewServiceImpl implements CrewService {

    private final CrewRepository crewRepository;
    private final MemberRepository memberRepository;
    private final S3Upload s3Upload;
    private final MemberCrewRepository memberCrewRepository;
    private final JoinWaitingRepository joinWaitingRepository;

    private final CrewChatService crewChatService;
    private final EntityManager em;

    private final NotificationService notificationService;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String restApiKey;

    // 크루 생성하기
    @Override
    public CreateCrewResponse createCrew(CreateCrewRequest request, MultipartFile image, UUID memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        String imageUrl = s3Upload.uploadImageToS3(image);

        ResponseEntity<String> res = null;
//        try {
            RestTemplate rest = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // REST_API_KEY
            headers.set("Authorization", "KakaoAK " + restApiKey);

            HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
            // x: 경도 longitude, y: 위도 latitude
            String apiURL = "https://dapi.kakao.com/v2/local/search/address?query=" + request.getActivityArea();
//            URI uri = new URI(apiURL);

            res = rest.exchange(apiURL, HttpMethod.GET, entity, String.class);
//        } catch (URISyntaxException e) {
//            throw new RuntimeException(e);
//        }

        String lon = null;
        String lat = null;
        String address = null;
        try {
            JSONObject locJsonObj1 = new JSONObject(res.getBody());
            log.info("카카오에서 좌표 가져오기 -> {}", locJsonObj1);
            JSONArray locJsonArr = new JSONArray(locJsonObj1.getJSONArray("documents"));
            JSONObject locJsonObj2 = (JSONObject) locJsonArr.get(0);
            lon = locJsonObj2.getString("x");
            lat = locJsonObj2.getString("y");
            address = locJsonObj2.getString("address_name");
        } catch (JSONException e) {
            log.error(e.getMessage());
        }

        log.info("크루 생성할 때 주소로 좌표 가져오기 -> {}, {}", lon, lat);
        Crew saveCrew = crewRepository.save(Crew.createCrew(request, imageUrl, findMember, lon != null ? Double.parseDouble(lon) : null, lat != null ? Double.parseDouble(lat) : null, address));

        // 생성 후 참가시켜주기
        memberCrewRepository.save(MemberCrew.create(findMember, saveCrew));

        crewChatService.makeRoom(findMember.getId().toString(), saveCrew.getId());

        return CreateCrewResponse.from(saveCrew.getId());
    }


    // 크루 참가 신청하기
    @Override
    public CreateCrewResponse signCrew(UUID memberId, Long crewId, SignCrewRequest request) {
        // 이미 가입 신청했는지 확인하기
        Optional<JoinWaiting> joinWaitingByMemberIdAndCrewId =
                joinWaitingRepository.findByMemberIdAndCrewId(memberId, crewId);
        if (joinWaitingByMemberIdAndCrewId.isPresent()) {
            throw new DuplicateException(JOIN_CREW_DUPLICATED);
        }

        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        Crew findCrew = crewRepository.findById(crewId)
                .orElseThrow(() -> new NotFoundException(CREW_NOT_FOUND));

        // 신청 완료
        joinWaitingRepository.save(JoinWaiting.create(findMember, findCrew, request.getComment()));
        notificationService.send(findCrew.getCrewMaster().getId(), findMember.getNickname() + "님이 크루 가입을 신청했습니다!!","message");


        return CreateCrewResponse.from(findCrew.getId());
    }

    // 크루 가입신청 허가하기
    @Override
    public void accessJoinCrew(UUID memberId, Long joinWaitingId) {
        Member crewKing = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        JoinWaiting findJoinWaiting = joinWaitingRepository.findByIdWithMemberAndCrew(joinWaitingId)
                .orElseThrow(() -> new NotFoundException(JOINWAITING_NOT_FOUND));

        // 이미 가입한 크루면 에러
        Optional<MemberCrew> existCrewMember =
                memberCrewRepository.findMemberCrewByMemberIdAndCrewId(findJoinWaiting.getMember().getId(), findJoinWaiting.getCrew().getId());
        if (existCrewMember.isPresent()) {
            throw new DuplicateException(CREW_MEMBER_DUPLICATED);
        }

        // 허가하는 사람이 크루장인지 검사
        if (!findJoinWaiting.getCrew().getCrewMaster().getId().equals(crewKing.getId())) {
            throw new NotMatchException(CREW_KING_NOT_MATCH);
        }
        Long crewId = findJoinWaiting.getCrew().getId();

        // 영속성 컨텍스트 초기화
        em.clear();

        // 크루 최대 참여자 수 안넘는지 체크
        Crew joinCrew = crewRepository.findByCrewIdForLock(crewId).get();
        System.out.println("현재원 수:" + joinCrew.getMemberCrewList().size());
        if (joinCrew.getMemberCrewList().size() >= joinCrew.getMaxParticipantCnt()) {
            throw new NotMatchException(CREW_MAX_PARTICIPANT_CNT_NOT_MATCH);
        }

        // 가입 처리
        memberCrewRepository.save(MemberCrew.create(findJoinWaiting.getMember(), findJoinWaiting.getCrew()));
        // 대기목록에서 삭제
        joinWaitingRepository.delete(findJoinWaiting);

        notificationService.send(findJoinWaiting.getMember().getId(), "가입 승인이 완료 됐습니다!!","message");
    }

    // 크루 참가 대기자들 보기
    @Override
    @Transactional(readOnly = true)
    public List<JoinWaiterDto> getCrewJoinWaiters(Long crewId) {
        List<JoinWaiting> crewJoinWaiterList = joinWaitingRepository.findByCrewIdWithMember(crewId);

        return crewJoinWaiterList.stream().map(joinWaiting -> JoinWaiterDto.from(joinWaiting))
                .collect(Collectors.toList());
    }

    // 크루 상세 조회
    // 본인이 크루장이면 isCrewMaster: true
    @Override
    @Transactional(readOnly = true)
    public CrewDetailInfoResponse getCrewDetailInfo(Long crewId, UUID loginMemberId) {
        // 크루 기본 데이터 조회
        Crew findCrew = crewRepository.findByIdWithCrewMasterAndParticipants(crewId)
                .orElseThrow(() -> new NotFoundException(CREW_NOT_FOUND));
        // 크루 총 기록 데이터 조회
        CrewTotalRecordDtoInterface crewTotalRecordInterface = memberCrewRepository.findTotalRecordByCrewId(crewId).get();

        // 크루 플로깅 한 날짜 데이터 조회
        List<CrewPloggingRecordDateInterface> crewPloggingRecordDateInterfaceList = memberCrewRepository.findCrewPloggingDate(crewId);
        List<CrewPloggingRecordDate> crewPloggingRecordDateList = crewPloggingRecordDateInterfaceList.stream().map(crewPloggingRecordDateInterface -> CrewPloggingRecordDate.from(crewPloggingRecordDateInterface))
                .collect(Collectors.toList());

        return CrewDetailInfoResponse.from(findCrew, crewTotalRecordInterface, crewPloggingRecordDateList, loginMemberId);
    }

    // 전체 크루 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public List<CrewSimpleResponse> getCrewList() {
        List<Crew> allWithMemberCrewList = crewRepository.findAllWithMemberCrewList();

        return allWithMemberCrewList.stream().map(crew -> CrewSimpleResponse.from(crew))
                .collect(Collectors.toList());
    }

    // TOP3 크루 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public Top3CrewResponse getTop3CrewList() {
        List<Top3CrewDtoInterface> top3DistanceCrewInterfaceList = memberCrewRepository.findTop3DistanceCrew();
        List<Top3CrewDto> top3Distance = top3DistanceCrewInterfaceList.stream().map(top3CrewDtoInterface -> Top3CrewDto.from(top3CrewDtoInterface))
                .collect(Collectors.toList());

        List<Top3CrewDtoInterface> top3TimeCrewInterfaceList = memberCrewRepository.findTop3TimeCrew();
        List<Top3CrewDto> top3Time = top3TimeCrewInterfaceList.stream().map(top3CrewDtoInterface -> Top3CrewDto.from(top3CrewDtoInterface))
                .collect(Collectors.toList());

        return Top3CrewResponse.from(top3Distance, top3Time);
    }

    // 내 근처 크루 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public List<CrewSimpleResponse> getCrewListNear(Double lat, Double lon) {
        List<NearCrewListInterface> nearCrewInterface = crewRepository.findAllNear(lat, lon);
        List<Long> crewIdList = new ArrayList<>();
        for (NearCrewListInterface nearCrewListInterface : nearCrewInterface) {
            crewIdList.add(nearCrewListInterface.getCrewId());
        }

        List<Crew> nearCrewListInfo = crewRepository.findByIdListWithMemberCrewList(crewIdList);

        return nearCrewListInfo.stream().map(crew -> CrewSimpleResponse.from(crew))
                .collect(Collectors.toList());
    }

    // 내 크루 리스트 조회
    @Override
    @Transactional(readOnly = true)
    public List<CrewSimpleResponse> getMyCrewList(UUID memberId) {
        List<MemberCrew> memberCrewListByMemberId = memberCrewRepository.findMemberCrewListByMemberId(memberId);

        return memberCrewListByMemberId.stream().map(memberCrew -> CrewSimpleResponse.from(memberCrew.getCrew()))
                .collect(Collectors.toList());
    }

    // 크루 가입신청 거절하기
    @Override
    public void denyJoinCrew(UUID memberId, Long joinWaitingId) {
        Member crewKing = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        JoinWaiting findJoinWaiting = joinWaitingRepository.findByIdWithMemberAndCrew(joinWaitingId)
                .orElseThrow(() -> new NotFoundException(JOINWAITING_NOT_FOUND));

        // 허가하는 사람이 크루장인지 검사
        if (!findJoinWaiting.getCrew().getCrewMaster().getId().equals(crewKing.getId())) {
            throw new NotMatchException(CREW_KING_NOT_MATCH);
        }

        // 대기목록에서 삭제
        joinWaitingRepository.delete(findJoinWaiting);
        notificationService.send(findJoinWaiting.getMember().getId(), "크루에서 거절 당했습니다!!", "message");
    }

    @Override
    public TotalRankingResponse getCrewLanking(Long crewId) {
        List<TotalRankingDistanceInterface> totalRankingDistance = memberCrewRepository.findCrewRankingDistance(crewId);
        List<TotalRankingTimeInterface> totalRankingTime = memberCrewRepository.findCrewRankingTime(crewId);
        List<TotalRankingCntInterface> totalRankingCnt = memberCrewRepository.findCrewRankingCnt(crewId);

        return TotalRankingResponse.create(totalRankingDistance, totalRankingTime, totalRankingCnt);
    }
}
