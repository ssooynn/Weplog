package com.ssafy.memberservice.global.common.error.exception;

public class NotMatchException extends RuntimeException{

    public static final String CONTENT_TYPE_NOT_MATCH = "첨부파일 형식이 맞지 않습니다.";
    public static final String CREW_KING_NOT_MATCH = "본인이 생성한 크루가 아닙니다.";
    public static final String CREW_MAX_PARTICIPANT_CNT_NOT_MATCH = "크루 최대 인원을 초과했습니다.";
    public static final String PET_MAX_LEVEL_NOT_MATCH = "플로몬이 최대 레벨이 아닙니다.";
    public NotMatchException(String message) {
        super(message);
    }
}
