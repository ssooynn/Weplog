package com.ssafy.memberservice.global.common.error.exception;

public class NotFoundException extends RuntimeException{

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String CREW_NOT_FOUND = "존재하지 않는 크루입니다.";
    public static final String JOINWAITING_NOT_FOUND = "존재하지 않는 크루 참가 정보입니다.";
    public static final String MEMBER_PET_NOT_FOUND = "플로몬의 정보가 없습니다.";
    public NotFoundException(String message) {
        super(message);
    }

}
