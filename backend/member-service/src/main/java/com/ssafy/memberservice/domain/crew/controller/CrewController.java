package com.ssafy.memberservice.domain.crew.controller;

import com.ssafy.memberservice.domain.crew.dto.*;
import com.ssafy.memberservice.domain.crew.service.CrewService;
import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingResponse;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crew")
public class CrewController {

    private final CrewService crewService;

    // 크루 생성하기
    @ApiOperation(value = "크루 생성하기", notes = "Multipart로 request, image 담아서")
    @PostMapping
    public ResponseEntity<CreateCrewResponse> createClan(@RequestPart CreateCrewRequest request,
                                                         @RequestPart MultipartFile image,
                                                         @RequestHeader("memberId") String memberId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(crewService.createCrew(request, image, UUID.fromString(memberId)));
    }

    @ApiOperation(value = "크루 가입 신청하기")
    @PostMapping("/join/{crewId}")
    public ResponseEntity<CreateCrewResponse> signCrew(@RequestHeader("memberId") String memberId,
                                   @PathVariable Long crewId, @RequestBody SignCrewRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(crewService.signCrew(UUID.fromString(memberId), crewId, request));
    }

    @ApiOperation(value = "크루 가입신청 허가하기")
    @PostMapping("/access/{joinWaitingId}")
    public ResponseEntity accessJoinCrew(@RequestHeader("memberId") String memberId,
                                         @PathVariable Long joinWaitingId) {
        crewService.accessJoinCrew(UUID.fromString(memberId), joinWaitingId);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "크루 가입신청 대기자들 보기")
    @GetMapping("/waiting/{crewId}")
    public ResponseEntity<List<JoinWaiterDto>> getCrewJoinWaiters(@PathVariable Long crewId) {
        return ResponseEntity.ok(crewService.getCrewJoinWaiters(crewId));
    }

    @ApiOperation(value = "크루 상세 조회", notes = "본인이 크루장이면 isCrewMaster: true")
    @GetMapping("/{crewId}")
    public ResponseEntity<CrewDetailInfoResponse> getCrewDetailInfo(@PathVariable Long crewId,
                                                                    @RequestHeader String memberId) {
        return ResponseEntity.ok(crewService.getCrewDetailInfo(crewId, UUID.fromString(memberId)));
    }

    @ApiOperation(value = "전체 크루 목록 조회")
    @GetMapping
    public ResponseEntity<List<CrewSimpleResponse>> getCrewList() {
        return ResponseEntity.ok(crewService.getCrewList());
    }

    @ApiOperation(value = "TOP3 크루 목록 조회")
    @GetMapping("/top3")
    public ResponseEntity<Top3CrewResponse> getTop3CrewList() {
        return ResponseEntity.ok(crewService.getTop3CrewList());
    }

    @ApiOperation(value = "내 근처 크루 목록 조회")
    @GetMapping("/near/{lat}/{lon}")
    public ResponseEntity<List<CrewSimpleResponse>> getCrewListNear(@PathVariable Double lat, @PathVariable Double lon) {
        return ResponseEntity.ok(crewService.getCrewListNear(lat, lon));
    }

    @ApiOperation(value = "내 크루 목록 조회")
    @GetMapping("/my")
    public ResponseEntity<List<CrewSimpleResponse>> getMyCrewList(@RequestHeader("memberId") String memberId) {
        return ResponseEntity.ok(crewService.getMyCrewList(UUID.fromString(memberId)));
    }

    @ApiOperation(value = "크루 가입 신청 거절하기")
    @DeleteMapping("/deny/{joinWaitingId}")
    public ResponseEntity denyCrewJoinCrew(@RequestHeader("memberId") String memberId,
                           @PathVariable Long joinWaitingId) {
        crewService.denyJoinCrew(UUID.fromString(memberId), joinWaitingId);

        return ResponseEntity.ok().build();
    }

    @ApiOperation(value = "크루 안의 기록 랭킹")
    @GetMapping("/ranking/{crewId}")
    public ResponseEntity<TotalRankingResponse> getCrewRanking(@PathVariable Long crewId) {
        return ResponseEntity.ok(crewService.getCrewLanking(crewId));
    }
}

