package com.aman.urlshortner.config;

import com.aman.urlshortner.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class ExpirationScheduler {

    private final UrlRepository urlRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void expireOverdueUrls() {
        int expired = urlRepository.expireOverdueUrls(LocalDateTime.now());
        log.info("Expired {} overdue URLs", expired);
    }
}