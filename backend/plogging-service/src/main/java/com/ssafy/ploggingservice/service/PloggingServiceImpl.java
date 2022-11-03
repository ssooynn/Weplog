package com.ssafy.ploggingservice.service;

import com.ssafy.ploggingservice.domain.Coordinate;
import com.ssafy.ploggingservice.domain.Crew;
import com.ssafy.ploggingservice.domain.Member;
import com.ssafy.ploggingservice.domain.Plogging;
import com.ssafy.ploggingservice.dto.*;
import com.ssafy.ploggingservice.global.common.error.exception.NotExistException;
import com.ssafy.ploggingservice.global.common.error.exception.NotFoundException;
import com.ssafy.ploggingservice.infra.s3.S3Upload;
import com.ssafy.ploggingservice.messagequeue.KafkaProducer;
import com.ssafy.ploggingservice.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
    public List<CoordinateDto> getTrashCansLoc(double lat, double lng) {
        List<CoordinateDto> list = garbageRepository.getTrashCansLoc(lat, lng).stream().map(m -> new CoordinateDto(m))
                .collect(Collectors.toList());
        return list;
    }

    @Override
    public ArrayList<ArrayList<CoordinateDto>> getPloggingLoc(double lat, double lng) {
        ArrayList<ArrayList<CoordinateDto>> list = new ArrayList<>();
        ArrayList<CoordinateDto> coor = null;
        List<Plogging> plogging = ploggingRepository.getPloggingLoc(lat, lng, LocalDateTime.now().minusMinutes(20));
        for (Plogging plo:plogging) {
            coor = new ArrayList<>();
            for(Coordinate coordinate: coordinateRepository.findAllByPloggingId(plo.getId())){
                Point point = coordinate.getPloggingLoc();
                coor.add(new CoordinateDto(point));
            }
            list.add(coor);
        }
        return list;
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
        if (ploggingReq.getCrewId() != null) {
            findCrew = crewRepository.findById(ploggingReq.getCrewId())
                    .orElseThrow(() -> new NotFoundException(CREW_NOT_FOUND));
        }

        // 플로깅 기록 저장
        Plogging savePlogging = ploggingRepository.save(ploggingReq.toEntity(findMember, findCrew));

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
}
