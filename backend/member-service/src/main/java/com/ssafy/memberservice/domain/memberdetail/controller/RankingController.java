package com.ssafy.memberservice.domain.memberdetail.controller;

import com.ssafy.memberservice.domain.memberdetail.dto.TotalRankingResponse;
import com.ssafy.memberservice.domain.memberdetail.service.MyPageService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    private final MyPageService myPageService;

    @ApiOperation(value = "전체 랭킹 조회", notes = "거리, 시간, 횟수 랭킹 다 줌")
    @GetMapping("")
    public ResponseEntity<TotalRankingResponse> getTotalRanking() {
        return ResponseEntity.ok(myPageService.getTotalRanking());
    }
}
