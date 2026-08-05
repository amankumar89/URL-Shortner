package com.aman.urlshortner.controller;

import com.aman.urlshortner.dto.response.ApiResponse;
import com.aman.urlshortner.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final UrlService urlService;

    @GetMapping("/{shortCode}")
    public ResponseEntity<ApiResponse<Void>> redirectToUrl(@PathVariable String shortCode) {
        String urlString = urlService.redirect(shortCode);
        if(Objects.equals(urlString, "failed")) {
            return ApiResponse.badRequest("Expired url");
        }
        return ApiResponse.redirect(urlString);
    }
}
