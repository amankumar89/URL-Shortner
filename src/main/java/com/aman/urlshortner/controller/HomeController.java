package com.aman.urlshortner.controller;

import com.aman.urlshortner.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping
    public ResponseEntity<ApiResponse<String>> home() {
        return ApiResponse.ok("Server is up & healthy", null);
    }
}
