package com.ssafy.ploggingservice.service;

import com.ssafy.ploggingservice.domain.Coordinate;
import com.ssafy.ploggingservice.domain.Crew;
import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import com.ssafy.ploggingservice.dto.*;
import com.ssafy.ploggingservice.global.common.error.exception.NotFoundException;
import com.ssafy.ploggingservice.infra.s3.S3Upload;
import com.ssafy.ploggingservice.messagequeue.KafkaProducer;
import com.ssafy.ploggingservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.ploggingservice.global.common.error.exception.NotFoundException.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PloggingServiceImpl implements PloggingService {
    private final S3Upload s3Upload;
    private final PloggingRepository ploggingRepository;
    private final MemberRepository memberRepository;
    private final GarbageRepository garbageRepository;
    private final CoordinateRepository coordinateRepository;
    private final CrewRepository crewRepository;
    private final KafkaProducer kafkaProducer;

    @Value("${kakao-id}")
    private String restApiKey;

    // 플로깅 후 사진 등록
    @Override
    @Transactional
    public CreatePloggingRes postPloggingPicture(UUID memberId, Long ploggingId, MultipartFile image) {
        Plogging findPlogging = ploggingRepository.findById(ploggingId)
                .orElseThrow(() -> new NotFoundException(PLOGGING_NOT_FOUND));

        String imageUrl = s3Upload.uploadImageToS3(image);

        findPlogging.updateImageUrl(imageUrl);

        return CreatePloggingRes.from(findPlogging);
    }

    @Override
    public Slice<PloggingRes> getPloggingList(UUID memberId, Pageable pageable) {
        Slice<PloggingRes> slice = ploggingRepository.findAllById(memberId, pageable).map(m -> new PloggingRes(m));
        return slice;
    }

    @Override
    public List<GarbageDto> getTrashCansLoc(double lat, double lng) {
        List<GarbageDto> list = garbageRepository.getTrashCansLoc(lat, lng);
        return list;
    }

    @Override
    public List<List<CoordinateDto>> getPloggingLoc(double lat, double lng) {
        List<PloggingInterface> plogging = ploggingRepository.getPloggingLoc(lat, lng, LocalDateTime.now().minusMinutes(20));
        List<List<CoordinateDto>> answer = new ArrayList<>();
        List<CoordinateDto> list;
        for (PloggingInterface p: plogging) {
            Long id = p.getPloggingId();
            list = coordinateRepository.findAllByPloggingId(id).stream().map(CoordinateDto::new).collect(Collectors.toList());
            answer.add(list);
        }
        return answer;
    }

    // 플로깅 상세 조회 + 좌표 리스트
    @Override
    public PloggingDetailRes getPloggingInfo(Long id) {
        Plogging findPlogging = ploggingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(PLOGGING_NOT_FOUND));
        List<Coordinate> ploggingCoordinateList = coordinateRepository.findAllByPloggingId(id);

        return new PloggingDetailRes(findPlogging, ploggingCoordinateList);
    }

    // 플로깅 종료 후 기록 저장
    @Override
    @Transactional
    public CreatePloggingRes createPloggingRecord(String memberId, PloggingReq ploggingReq) {
        Member findMember = memberRepository.findById(UUID.fromString(memberId))
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Crew findCrew = null;
        log.info("plogging 종료 후 crewId 받기 -> {}", ploggingReq.getCrewId());
        if (ploggingReq.getCrewId() != null) {
            findCrew = crewRepository.findById(ploggingReq.getCrewId())
                    .orElseThrow(() -> new NotFoundException(CREW_NOT_FOUND));
        }

        // 시작 주소 가져오기
        ResponseEntity<String> res = null;
//        try {
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // REST_API_KEY
        headers.set("Authorization", "KakaoAK " + restApiKey);

        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        // x: 경도 longitude, y: 위도 latitude
        String apiURL = "https://dapi.kakao.com//v2/local/geo/coord2regioncode?" +
                "x=" + ploggingReq.getCoordinates().get(0).getLng() + "&" +
                "y=" + ploggingReq.getCoordinates().get(0).getLat();
//            URI uri = new URI(apiURL);

        res = rest.exchange(apiURL, HttpMethod.GET, entity, String.class);
//        } catch (URISyntaxException e) {
//            throw new RuntimeException(e);
//        }

        String address = null;
        try {
            JSONObject locJsonObj1 = new JSONObject(res.getBody());
            log.info("카카오에서 주소 가져오기 -> {}", locJsonObj1);
            JSONArray locJsonArr = new JSONArray(locJsonObj1.getJSONArray("documents"));
            JSONObject locJsonObj2 = (JSONObject) locJsonArr.get(0);
            address = locJsonObj2.getString("region_1depth_name") + " " + locJsonObj2.getString("region_2depth_name");
        } catch (JSONException e) {
            log.error(e.getMessage());
        }

        // 플로깅 기록 저장
        Plogging savePlogging = ploggingRepository.save(ploggingReq.toEntity(findMember, findCrew, address));

        // 카프카로 exit-plogging 토픽에 플로깅 기록 전달
        KafkaPloggingDto kafkaPloggingDto = KafkaPloggingDto.create(memberId, ploggingReq);
        kafkaProducer.sendExitPlogging("exit-plogging", kafkaPloggingDto);

        // 좌표 저장해야함.
        List<CoordinateDto> reqCordinates = ploggingReq.getCoordinates();
        List<Coordinate> coordinates = new ArrayList<>();
        for (CoordinateDto coordinate : reqCordinates) {
            coordinates.add(Coordinate.create(savePlogging, coordinate.getLng(), coordinate.getLat()));
        }

        // 좌표 저장
        coordinateRepository.saveAll(coordinates);

        return CreatePloggingRes.from(savePlogging);
    }

    // 전체 플로깅 피드 가져오기(최신순)
    @Override
    public List<PloggingFeedRes>  getPloggingFeed() {
        List<Plogging> feedList = ploggingRepository.findAllWithMemberOrderByCreatedDate();

        return feedList.stream().map(plogging -> PloggingFeedRes.from(plogging))
                .collect(Collectors.toList());
    }

    // 크루 플로깅 피드 가져오기(최신순)
    @Override
    public List<PloggingFeedRes> getPloggingCrewFeed(Long crewId) {
        List<Plogging> CrewFeedList = ploggingRepository.findCrewPloggingAllWithMemberOrderByCreatedDate(crewId);

        return CrewFeedList.stream().map(plogging -> PloggingFeedRes.from(plogging))
                .collect(Collectors.toList());
    }

    @Override
    public List<CrewPloggingByDateRes> getCrewPloggingRecordByDate(Long crewId, LocalDate date) {
        List<Plogging> findCrewPloggingByDate = ploggingRepository.findPloggingByCrewIdAndDate(crewId, date);

        List<CrewPloggingByDateRes> result = new ArrayList<>(); // 반환될 결과값

        // 찾아온 기록 데이터로 반복문
        for (Plogging plogging : findCrewPloggingByDate) {
            Member addMember = plogging.getMember(); // 기록의 주인
            boolean existMember = false;
            for (CrewPloggingByDateRes crewPloggingByDateRes : result) { // 기록의 주인이 이미 결과값에 포함되어 있으면 좌표 리스트만 추가
                if (crewPloggingByDateRes.getMemberId().equals(addMember.getId().toString())) {
                    crewPloggingByDateRes.getCoordinatesList().add(
                            plogging.getCoordinates()
                                    .stream().map(coordinate -> new CoordinateDto(coordinate))
                                    .collect(Collectors.toList())
                    );
                    crewPloggingByDateRes.addTimeAndDistance(plogging.getTime(), plogging.getDistance());
                    existMember = true;
                    break;
                }
            }
            if (existMember) continue;

            CrewPloggingByDateRes createResponse = CrewPloggingByDateRes.from(plogging);
            Color newColor = getNewColor(result);
            createResponse.setColor(newColor.name());
            result.add(createResponse);
        }

        return result;
    }

    @Override
    public List<Integer> getCrewPloggingDayByMonth(Long crewId, LocalDate date) {
        return ploggingRepository.findCrewPloggingDayByCrewIdAndDate(crewId, date);
    }

    private Color getNewColor(List<CrewPloggingByDateRes> crewPloggingByDateResList) {
        Set<Color> usedColors = new HashSet<>();
        if (crewPloggingByDateResList.size() == 0) return Color.RED;
        for (CrewPloggingByDateRes crewPloggingByDateRes : crewPloggingByDateResList) {
            usedColors.add(Color.valueOf(crewPloggingByDateRes.getColor()));
        }

        int size = crewPloggingByDateResList.size() * 2;
        for (int i = 0; i < size; i++) {
            Color newColor = Color.randomColor();
            if (!usedColors.contains(newColor)) {
                return newColor;
            }
        }
        return Color.RED;
    }
}
