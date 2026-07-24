package com.aman.urlshortner.service;

import com.aman.urlshortner.dto.mapper.UrlMapper;
import com.aman.urlshortner.dto.request.ShortenUrlRequestDto;
import com.aman.urlshortner.dto.response.ShortenUrlResponseDto;
import com.aman.urlshortner.dto.response.UrlResponseDto;
import com.aman.urlshortner.entity.Url;
import com.aman.urlshortner.entity.UrlStatus;
import com.aman.urlshortner.entity.Users;
import com.aman.urlshortner.exception.ResourceNotFoundException;
import com.aman.urlshortner.repository.UrlRepository;
import com.aman.urlshortner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final UrlRepository urlRepository;
    private final UrlMapper urlMapper;
    private final CurrentUserService currentUserService;
    private final UserRepository userRepository;

    public ShortenUrlResponseDto createShortenUrl(ShortenUrlRequestDto requestUrl) {
        Users user = userRepository
                .findById(currentUserService.getUserId())
                .orElseThrow(() -> new AuthorizationDeniedException("Forbidden"));
        Url url = urlMapper.mapToEntity(requestUrl, user);
        return urlMapper.shortenUrlResponseDto(urlRepository.save(url));
    }

    public Page<UrlResponseDto> getAllCodes(
            int page,
            int size,
            String sortBy,
            String orderBy,
            String search,
            UrlStatus status
    ) {
        Long userId = currentUserService.getUserId();
        if (userId == null) {
            throw new AuthorizationDeniedException("Unauthorized");
        }
        // sorting and page
        Sort.Direction direction = Sort.Direction.fromString(orderBy);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        return urlRepository
                .findAll(userId, search, status, pageable)
                .map(urlMapper::mapToUrlResponseDto);
    }

    public String redirect(String shortCode) {
        Url url = urlRepository
                .findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("URL not found"));
        return url.getTargetURL();
    }

    public void deleteUrl(Long id) {
        Long userId = currentUserService.getUserId();
        if (userId == null) {
            throw new AuthorizationDeniedException("Unauthorized or Forbidden");
        }
        Url url = urlRepository.findByIdAndUserId(id, userId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("URL not found")
                );

        urlRepository.delete(url);
    }
}
