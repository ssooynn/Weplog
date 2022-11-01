package com.ssafy.challengeservice.global.common.error.exception;

public class DuplicateException extends RuntimeException{

    public static final String NICKNAME_DUPLICATED = "이미 존재하는 닉네임 입니다.";
    public static final String CHALLENGE_DUPLICATED = "이미 존재하는 챌린지 입니다.";
    public static final String DUPLICATE_CHALLENGE_TYPE = "참여할 수 있는 챌린지 수를 초과했습니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
