package com.ssafy.ploggingservice.controller;

import com.ssafy.ploggingservice.domain.Garbage;
import com.ssafy.ploggingservice.dto.*;
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
    public ResponseEntity<Slice<PloggingRes>> getPloggingList(@RequestHeader("memberId") String memberId,
                                             Pageable pageable){
        Slice<PloggingRes> list = ploggingService.getPloggingList(UUID.fromString(memberId), pageable);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ApiOperation(value = "플로깅 상세 조회")
    @GetMapping("/{ploggingId}")
    public ResponseEntity<PloggingDetailRes> getPloggingList(@PathVariable("ploggingId")Long ploggingId){
        PloggingDetailRes plogging = ploggingService.getPloggingInfo(ploggingId);
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
    public ResponseEntity<List<GarbageDto>> getTrashCansLoc(@PathVariable("lat") double lat, @PathVariable("lng") double lng ){
        List<GarbageDto> list = ploggingService.getTrashCansLoc(lat, lng);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @ApiOperation(value = "플로깅 사진 등록")
    @PostMapping("/picture/{ploggingId}")
    public ResponseEntity<?> postPloggingRecording(@RequestHeader("memberId") String memberId,
                                                   @PathVariable Long ploggingId,
                                                   @RequestPart MultipartFile image){
        return ResponseEntity.ok(ploggingService.postPloggingPicture(UUID.fromString(memberId), ploggingId, image));
    }

    @ApiOperation(value = "플로깅 종료")
    @PostMapping("/exit")
    public ResponseEntity<CreatePloggingRes> createPloggingRecord(@RequestHeader("memberId") String memberId,
                                                                  @RequestBody PloggingReq ploggingReq) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ploggingService.createPloggingRecord(memberId, ploggingReq));
    }

    @ApiOperation(value = "최근 피드 리스트 조회")
    @GetMapping("/feed")
    public ResponseEntity<List<PloggingFeedRes>> getPloggingFeed() {
        return ResponseEntity.ok(ploggingService.getPloggingFeed());
    }

    @ApiOperation(value = "크루 플로깅 피드 리스트 조회")
    @GetMapping("/feed/crew/{crewId}")
    public ResponseEntity<List<PloggingFeedRes>> getPloggingFeedByCrew(@PathVariable Long crewId) {
        return ResponseEntity.ok(ploggingService.getPloggingCrewFeed(crewId));
    }
}
