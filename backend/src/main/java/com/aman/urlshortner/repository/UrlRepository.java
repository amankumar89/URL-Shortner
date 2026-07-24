package com.aman.urlshortner.repository;

import com.aman.urlshortner.entity.Url;
import com.aman.urlshortner.entity.UrlStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
//    Page<Url> findByUserId(Long userId);

    Optional<Url> findByShortCode(String shortCode);

    Optional<Url> findByIdAndUserId(Long id, Long userId);

    @Query("""
        SELECT u FROM Url u
        WHERE u.user.id = :userId
        AND (:search IS NULL OR u.targetUrl LIKE %:search%)
        AND (:status IS NULL OR u.status = :status)
    """)
    Page<Url> findAll(
            @Param("userId") Long userId,
            @Param("search") String search,
            @Param("status") UrlStatus status,
            Pageable pageable
    );
}
