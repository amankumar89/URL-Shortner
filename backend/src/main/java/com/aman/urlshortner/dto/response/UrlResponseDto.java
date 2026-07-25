package com.aman.urlshortner.dto.response;

import com.aman.urlshortner.entity.UrlStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UrlResponseDto {
    private Long id;
    private String shortCode;
    private String targetUrl;
    private UrlStatus status;
    private LocalDateTime expirationDate;
    private int clickCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
