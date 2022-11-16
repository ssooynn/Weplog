package com.ssafy.ploggingservice.global.common.error.exception;

public class NotMatchException extends RuntimeException{

    public static final String CONTENT_TYPE_NOT_MATCH = "첨부파일 형식이 맞지 않습니다.";
    public NotMatchException(String message) {
        super(message);
    }
}
