package com.ssafy.ploggingservice.service;

import com.ssafy.ploggingservice.domain.Coordinate;
import com.ssafy.ploggingservice.domain.Plogging;
import com.ssafy.ploggingservice.dto.CoordinateDto;
import com.ssafy.ploggingservice.dto.PloggingReq;
import com.ssafy.ploggingservice.dto.PloggingRes;
import com.ssafy.ploggingservice.infra.s3.S3Upload;
import com.ssafy.ploggingservice.repository.CoordinateRepository;
import com.ssafy.ploggingservice.repository.GarbageRepository;
import com.ssafy.ploggingservice.repository.MemberRepository;
import com.ssafy.ploggingservice.repository.PloggingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PloggingServiceImpl implements PloggingService {
    private static S3Upload s3Upload;
    private static PloggingRepository ploggingRepository;
    private static MemberRepository memberRepository;
    private static GarbageRepository garbageRepository;
    private static CoordinateRepository coordinateRepository;

    @Override
    public void postPlogging(UUID userId, PloggingReq ploggingReq,  MultipartFile image) {
        ploggingRepository.save(ploggingReq.toEntity(memberRepository.findById(userId).get()));
        return;
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

    @Override
    public PloggingRes getPloggingInfo(Long id) {
        return new PloggingRes(ploggingRepository.findById(id).get());
    }
}
