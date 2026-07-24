package com.aman.urlshortner.controller;

import com.aman.urlshortner.dto.request.ShortenUrlRequestDto;
import com.aman.urlshortner.dto.response.ApiResponse;
import com.aman.urlshortner.dto.response.ShortenUrlResponseDto;
import com.aman.urlshortner.dto.response.UrlResponseDto;
import com.aman.urlshortner.entity.UrlStatus;
import com.aman.urlshortner.service.UrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/url")
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<ApiResponse<ShortenUrlResponseDto>> createShortenUrl(
            @Valid @RequestBody ShortenUrlRequestDto requestUrl
    ) {
        ShortenUrlResponseDto createdUrl = urlService.createShortenUrl(requestUrl);
        return ApiResponse.created("URL created", createdUrl);
    }

    @GetMapping("/codes")
    public ResponseEntity<ApiResponse<Page<UrlResponseDto>>> getAllCodes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String orderBy,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UrlStatus status
    ) {
        Page<UrlResponseDto> lists = urlService.getAllCodes(
                page,
                size,
                sortBy,
                orderBy,
                search,
                status
        );
        return ApiResponse.ok("All URLs fetched", lists);
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<ApiResponse<Void>> redirectToUrl(@PathVariable String shortCode) {
        String urlString = urlService.redirect(shortCode);
        return ApiResponse.redirect(urlString);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteShortenUrl(@PathVariable Long id) {
        urlService.deleteUrl(id);
        return ApiResponse.noContent("URL deleted for id" + id);
    }
}
