package com.ssafy.memberservice.domain.member.dto.memberdetail.service;

import com.ssafy.memberservice.domain.member.dto.memberdetail.dto.MyPageDetailRes;
import com.ssafy.memberservice.domain.member.dto.memberdetail.dto.MyPageRes;

import java.util.UUID;


public interface MyPageService {
    MyPageDetailRes getMyPageDetail(UUID uuid);
    MyPageRes getMyPage(UUID uuid);

}
