package com.aman.urlshortner.dto.response;

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
    private String targetURL;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
