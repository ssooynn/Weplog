package com.ssafy.ploggingservice.service;

import com.ssafy.ploggingservice.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface PloggingService {

    CreatePloggingRes postPloggingPicture(UUID memberId, Long ploggingId, MultipartFile image);
    Slice<PloggingRes> getPloggingList(UUID memberId, Pageable pageable);
    List<GarbageDto> getTrashCansLoc(double lat, double lng);
    List<List<CoordinateDto>> getPloggingLoc(double lat, double lng);
    PloggingDetailRes getPloggingInfo(Long id);


    CreatePloggingRes createPloggingRecord(String memberId, PloggingReq ploggingReq);

    List<PloggingFeedRes> getPloggingFeed();

    List<PloggingFeedRes> getPloggingCrewFeed(Long crewId);

    List<CrewPloggingByDateRes> getCrewPloggingRecordByDate(Long crewId, LocalDate date);

    List<Integer> getCrewPloggingDayByMonth(Long crewId, LocalDate date);
}
