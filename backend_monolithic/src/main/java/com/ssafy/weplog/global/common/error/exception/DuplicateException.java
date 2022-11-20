package com.ssafy.weplog.global.common.error.exception;

public class DuplicateException extends RuntimeException{

    public static final String NICKNAME_DUPLICATED = "이미 존재하는 닉네임 입니다.";
    public static final String CHALLENGE_DUPLICATED = "이미 존재하는 챌린지 입니다.";
    public DuplicateException(String message) {
        super(message);
    }
}
