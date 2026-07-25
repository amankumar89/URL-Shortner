package com.aman.urlshortner.config;

import com.aman.urlshortner.entity.Url;
import com.aman.urlshortner.entity.UrlStatus;
import com.aman.urlshortner.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ExpirationScheduler {

    private final UrlRepository urlRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void expireOverdueUrls() {
        List<Url> activeUrls = urlRepository.findAll();
        LocalDateTime today = LocalDateTime.now();

        for (Url item : activeUrls) {
            if (item.getExpirationDate() != null &&
                    item.getExpirationDate().isBefore(today) &&
                    item.getStatus() != UrlStatus.EXPIRED) {
                item.setStatus(UrlStatus.EXPIRED);
            }
        }
        urlRepository.saveAll(activeUrls);
    }
}