package com.aman.urlshortner.dto.request;

import com.aman.urlshortner.entity.UrlStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShortenUrlRequestDto {
    @NotBlank(message = "TargetUrl is required")
    @URL(message = "Invalid TargetUrl")
    private String targetUrl;
    private String shortCode;

    @Enumerated(EnumType.STRING)
    private UrlStatus status;
    private String expirationDate;
}
