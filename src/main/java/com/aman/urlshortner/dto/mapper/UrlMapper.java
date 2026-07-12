package com.aman.urlshortner.dto.mapper;

import com.aman.urlshortner.dto.request.ShortenUrlRequestDto;
import com.aman.urlshortner.dto.response.ShortenUrlResponseDto;
import com.aman.urlshortner.dto.response.UrlResponseDto;
import com.aman.urlshortner.entity.Url;
import com.aman.urlshortner.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UrlMapper {

    public Url mapToEntity(ShortenUrlRequestDto requestUrl, Users user) {
        String randomCode = UUID.randomUUID()
                .toString()
                .substring(0, 6);
        String shortCode = (
                requestUrl.getCode() == null || requestUrl.getCode().isBlank())
                ? randomCode : requestUrl.getCode();

        return Url
                .builder()
                .shortCode(shortCode)
                .targetURL(requestUrl.getUrl())
                .user(user)
                .build();
    }

    public UrlResponseDto mapToUrlResponseDto(Url url) {
        return UrlResponseDto
                .builder()
                .id(url.getId())
                .shortCode(url.getShortCode())
                .targetURL(url.getTargetURL())
                .createdAt(url.getCreatedAt())
                .updatedAt(url.getUpdatedAt())
                .build();
    }

    public ShortenUrlResponseDto shortenUrlResponseDto(Url url) {
        return ShortenUrlResponseDto
                .builder()
                .id(url.getId())
                .shortCode(url.getShortCode())
                .targetURL(url.getTargetURL())
                .build();
    }
}
