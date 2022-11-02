package com.ssafy.ploggingservice.controller;

import com.ssafy.ploggingservice.dto.CoordinateDto;
import com.ssafy.ploggingservice.dto.PloggingReq;
import com.ssafy.ploggingservice.dto.PloggingRes;
import com.ssafy.ploggingservice.service.PloggingService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("plogging")
public class PloggingController
{
    private final PloggingService ploggingService;

    @ApiOperation(value = "내 플로깅 리스트 조회")
    @GetMapping("")
    public ResponseEntity<?> getPloggingList(@RequestHeader("memberId") String memberId,
                                             Pageable pageable){
        Slice<PloggingRes> list = ploggingService.getPloggingList(UUID.fromString(memberId), pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ApiOperation(value = "플로깅 조회")
    @GetMapping("/{ploggingId}")
    public ResponseEntity<?> getPloggingList(@PathVariable("ploggingId")Long ploggingId){
        PloggingRes plogging = ploggingService.getPloggingInfo(ploggingId);
        return new ResponseEntity<>(plogging, HttpStatus.OK);
    }

    @ApiOperation(value = "플로깅 전", notes = "현 위치 기준 5km 이내, 20분 이내 기록 리스트 조회")
    @GetMapping("/{lat}/{lng}")
    public ResponseEntity<?> getPloggingLoc(@PathVariable("lat") double lat, @PathVariable("lng") double lng){
        ArrayList<ArrayList<CoordinateDto>> list = ploggingService.getPloggingLoc(lat, lng);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ApiOperation(value = "근처 쓰레기통 리스트")
    @GetMapping("garbage/{lat}/{lng}")
    public ResponseEntity<?> getTrashCansLoc(@PathVariable("lat") double lat, @PathVariable("lng") double lng ){
        List<CoordinateDto> list = ploggingService.getTrashCansLoc(lat, lng);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @ApiOperation(value = "플로깅 등록")
    @PostMapping("")
    public ResponseEntity<?> postPloggingRecording(@RequestHeader("memberId") String memberId,
                                                   @RequestBody PloggingReq ploggingReq,
                                                   @RequestParam("image") MultipartFile image){
        ploggingService.postPlogging(UUID.fromString(memberId), ploggingReq, image);
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }
}
