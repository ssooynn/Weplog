package com.ssafy.weplog.domain.mysql.crew.service;

import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewRequest;
import com.ssafy.weplog.domain.mysql.crew.dto.CreateCrewResponse;
import com.ssafy.weplog.global.config.security.auth.CustomUserDetails;
import org.springframework.web.multipart.MultipartFile;

public interface CrewService {
    CreateCrewResponse createCrew(CreateCrewRequest request, MultipartFile image, CustomUserDetails member);
}
