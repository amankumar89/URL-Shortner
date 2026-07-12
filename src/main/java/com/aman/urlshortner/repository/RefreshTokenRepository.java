package com.aman.urlshortner.repository;

import com.aman.urlshortner.entity.RefreshToken;
import com.aman.urlshortner.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUser(Users user);

    void deleteByUser(Users user);
}
