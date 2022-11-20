package com.ssafy.memberservice.global.common.error.exception;

public class NotExistException extends RuntimeException{

    public static final String CREW_MEMBER_NOT_EXIST = "가입된 크루가 아닙니다.";
    public NotExistException(String message) {
        super(message);
    }
}
