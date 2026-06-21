package com.diagnostico.raioxbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RaioXBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RaioXBackendApplication.class, args);
    }
}
