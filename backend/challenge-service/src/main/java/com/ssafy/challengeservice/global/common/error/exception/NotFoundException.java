package com.ssafy.challengeservice.global.common.error.exception;

public class NotFoundException extends RuntimeException{

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String CHALLENGE_NOT_FOUND = "존재하지 않는 챌린지입니다.";
    public NotFoundException(String message) {
        super(message);
    }

}
