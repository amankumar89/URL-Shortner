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
        System.out.println(requestUrl.toString());
        Url url = new Url();
        url.setShortCode(requestUrl.getShortCode());
        url.setTargetUrl(requestUrl.getTargetUrl());
        url.setUser(user);
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
}
