package com.ssafy.memberservice.global.common.error.exception;

public class OAuthProcessingException extends RuntimeException {

    public OAuthProcessingException(String message) {
        super(message);
    }
}
