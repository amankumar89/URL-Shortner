package com.aman.urlshortner.repository;

import com.aman.urlshortner.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    List<Url> findByUserId(Long userId);

    Optional<Url> findByShortCode(String shortCode);

    Optional<Url> findByIdAndUserId(Long id, Long userId);
}
