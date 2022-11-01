package com.ssafy.challengeservice.dto.response;

import lombok.Data;

@Data
public class CreateChallengeRes {
    private Long challengeId;

    public static CreateChallengeRes create(Long id) {
        CreateChallengeRes createChallengeRes = new CreateChallengeRes();
        createChallengeRes.challengeId = id;

        return createChallengeRes;
    }
}
