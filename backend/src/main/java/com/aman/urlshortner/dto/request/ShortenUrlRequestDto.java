package com.aman.urlshortner.dto.request;

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
    @NotBlank(message = "URL is required")
    @URL(message = "Invalid url")
    private String url;
    private String code;
}
