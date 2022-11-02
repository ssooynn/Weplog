package com.ssafy.memberservice.domain.crew.service;

import com.ssafy.memberservice.domain.crew.dto.CreateCrewRequest;
import com.ssafy.memberservice.domain.crew.dto.CreateCrewResponse;
import com.ssafy.memberservice.global.security.auth.CustomUserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface CrewService {
    CreateCrewResponse createCrew(CreateCrewRequest request, MultipartFile image, UUID memberId);
}
