package com.ssafy.ploggingservice.service;

import com.ssafy.ploggingservice.dto.CoordinateDto;
import com.ssafy.ploggingservice.dto.PloggingReq;
import com.ssafy.ploggingservice.dto.PloggingRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public interface PloggingService {

    void postPlogging(UUID memberId, PloggingReq ploggingReq, MultipartFile image);
    Slice<PloggingRes> getPloggingList(UUID memberId, Pageable pageable);
    List<CoordinateDto> getTrashCansLoc(double lat, double lng);
    ArrayList<ArrayList<CoordinateDto>> getPloggingLoc(double lat, double lng);
    PloggingRes getPloggingInfo(Long id);


}
