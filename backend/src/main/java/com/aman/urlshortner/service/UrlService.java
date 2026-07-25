package com.aman.urlshortner.service;

import com.aman.urlshortner.dto.request.ShortenUrlRequestDto;
import com.aman.urlshortner.dto.response.PageResponseDto;
import com.aman.urlshortner.dto.response.ShortenUrlResponseDto;
import com.aman.urlshortner.dto.response.UrlResponseDto;
import com.aman.urlshortner.entity.Url;
import com.aman.urlshortner.entity.UrlStatus;
import com.aman.urlshortner.entity.Users;
import com.aman.urlshortner.exception.ResourceNotFoundException;
import com.aman.urlshortner.repository.UrlRepository;
import com.aman.urlshortner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final UrlRepository urlRepository;
    private final ModelMapper modelMapper;
    private final CurrentUserService currentUserService;
    private final UserRepository userRepository;

    public ShortenUrlResponseDto createShortenUrl(ShortenUrlRequestDto requestUrl) {
        Users user = userRepository
                .findById(currentUserService.getUserId())
                .orElseThrow(() -> new AuthorizationDeniedException("Forbidden"));
        Url url = new Url();
        url.setShortCode(requestUrl.getShortCode());
        url.setTargetUrl(requestUrl.getTargetUrl());
        url.setUser(user);
        if(requestUrl.getStatus() != null){
            url.setStatus(requestUrl.getStatus());
        }
        return modelMapper.map(urlRepository.save(url), ShortenUrlResponseDto.class);
    }

    public PageResponseDto<UrlResponseDto> getAllCodes(
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
        Page<Url> urlPage = urlRepository.findAll(userId, search, status, pageable);

        List<UrlResponseDto> urlLists = urlPage.getContent()
                .stream()
                .map((url) -> modelMapper.map(url, UrlResponseDto.class))
                .toList();

        return PageResponseDto
                .<UrlResponseDto>builder()
                .links(urlLists)
                .size(urlPage.getSize())
                .total(urlPage.getTotalElements())
                .totalPages(urlPage.getTotalPages())
                .build();
    }

    public String redirect(String shortCode) {
        Url url = urlRepository
                .findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("URL not found"));
        if(url.getStatus() == UrlStatus.EXPIRED) {
            return "failed";
        }
        url.setClickCount(url.getClickCount() + 1);
        urlRepository.save(url);
        return url.getTargetUrl();
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

    @Transactional
    public UrlStatus toggleStatus(Long id) {
        Url url = urlRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Url not found"));
        checkAndExpireIfNeeded(url);
        if(url.getStatus() != UrlStatus.EXPIRED){
            UrlStatus currentStatus = url.getStatus();
            UrlStatus newStatus = getNextStatus(url.getStatus());
            url.setStatus(newStatus);
            urlRepository.save(url);
            return newStatus;
        }else return url.getStatus();
    }

    private void checkAndExpireIfNeeded(Url url){
        if (url.getExpirationDate() != null &&
                url.getExpirationDate().isBefore(LocalDateTime.now()) &&
                url.getStatus() != UrlStatus.EXPIRED) {
            url.setStatus(UrlStatus.EXPIRED);
            urlRepository.save(url);
        }
    }

    private UrlStatus getNextStatus(UrlStatus status){
        return switch (status){
            case ACTIVE -> UrlStatus.PAUSED;
            case PAUSED -> UrlStatus.ACTIVE;
            case EXPIRED -> UrlStatus.EXPIRED;
        };
    }
}
