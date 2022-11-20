package com.ssafy.achievementservice.global.config.web;

import com.ssafy.achievementservice.global.common.error.ExceptionResponse;
import com.ssafy.achievementservice.global.common.error.exception.DuplicateException;
import com.ssafy.achievementservice.global.common.error.exception.NotExistException;
import com.ssafy.achievementservice.global.common.error.exception.NotFoundException;
import com.ssafy.achievementservice.global.common.error.exception.NotMatchException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@Slf4j
//@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> errors.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(ExceptionResponse.from("잘못된 요청입니다.", errors));
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(BindException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(error -> errors.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(ExceptionResponse.from("잘못된 요청입니다.", errors));
    }

    @ExceptionHandler({NotExistException.class, NotMatchException.class, NotFoundException.class, DuplicateException.class})
    public ResponseEntity<ExceptionResponse> handleBadRequestExceptions(Exception e) {
        return ResponseEntity.badRequest().body(ExceptionResponse.from(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception e) {
        log.info("{}", e.getMessage());
        return ExceptionResponse.from(e.getMessage());
    }

}
