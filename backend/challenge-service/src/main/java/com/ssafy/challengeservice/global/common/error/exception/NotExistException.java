package com.ssafy.challengeservice.global.common.error.exception;

public class NotExistException extends RuntimeException{

    public NotExistException(String message) {
        super(message);
    }
}
