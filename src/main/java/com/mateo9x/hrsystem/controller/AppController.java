package com.mateo9x.hrsystem.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class AppController {
    @GetMapping("/app-running")
    public ResponseEntity<String> isAppRunning() {
        log.info("REST request to check if app is running");
        return ResponseEntity.ok("SUCCESS");
    }
}
