package com.ssafy.weplog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WeplogApplication {

    public static void main(String[] args) {
        SpringApplication.run(WeplogApplication.class, args);
    }

}
