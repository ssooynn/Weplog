package com.ssafy.challengeservice.global.common.error.exception;

public class NotExistException extends RuntimeException{

    public static final String NO_EXIST_MEMBER_CHALLENGE = "존재하지 않는 챌린지 이력입니다.";
    public NotExistException(String message) {
        super(message);
    }
}
