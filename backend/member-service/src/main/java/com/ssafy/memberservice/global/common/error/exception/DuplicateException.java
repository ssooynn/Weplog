package com.ssafy.memberservice.global.common.error.exception;

public class DuplicateException extends RuntimeException{

    public static final String NICKNAME_DUPLICATED = "이미 존재하는 닉네임 입니다.";
    public static final String CHALLENGE_DUPLICATED = "이미 존재하는 챌린지 입니다.";
    public static final String GROWING_PET_DUPLICATED = "이미 키우고 있는 플로몬이 있습니다.";
    public static final String JOIN_CREW_DUPLICATED = "이미 가입 신청한 크루입니다.";
    public static final String CREW_MEMBER_DUPLICATED = "이미 가입한 크루입니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
