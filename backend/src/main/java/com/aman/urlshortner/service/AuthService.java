package com.aman.urlshortner.service;

import com.aman.urlshortner.dto.request.LoginRequestDto;
import com.aman.urlshortner.dto.request.RegisterRequestDto;
import com.aman.urlshortner.dto.request.UpdateRequestDto;
import com.aman.urlshortner.dto.response.LoginResponseDto;
import com.aman.urlshortner.dto.response.RefreshTokenResponseDto;
import com.aman.urlshortner.dto.response.RegisterResponseDto;
import com.aman.urlshortner.dto.response.UserResponseDto;
import com.aman.urlshortner.entity.RefreshToken;
import com.aman.urlshortner.entity.Users;
import com.aman.urlshortner.exception.DuplicateResourceException;
import com.aman.urlshortner.exception.InvalidCredentialsException;
import com.aman.urlshortner.exception.ResourceNotFoundException;
import com.aman.urlshortner.repository.RefreshTokenRepository;
import com.aman.urlshortner.repository.UserRepository;
import com.aman.urlshortner.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CookieUtil cookieUtil;
    private final CurrentUserService currentUserService;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    public RegisterResponseDto registerUser(RegisterRequestDto registerRequestDto) {
        if (userRepository.existsByEmail(registerRequestDto.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }
        Users user = modelMapper.map(registerRequestDto, Users.class);
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        Users savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, RegisterResponseDto.class);
    }

    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto, HttpServletResponse response) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequestDto.getEmail(), loginRequestDto.getPassword()
        ));

        Users user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail());
        RefreshToken refreshToken = createRefreshToken(user);
        refreshTokenRepository.save(refreshToken);
        cookieUtil.addRefreshCookie(
                response,
                refreshToken.getToken(),
                (int) (refreshTokenExpiration / 1000)
        );
        LoginResponseDto loginResponseDto = modelMapper.map(user, LoginResponseDto.class);
        loginResponseDto.setToken(accessToken);
        return loginResponseDto;
    }

    public UserResponseDto update(UpdateRequestDto requestDto) {
        Long userId = currentUserService.getUserId();
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id "+userId));
        user.setFirstName(requestDto.getFirstName());
        user.setLastName(requestDto.getLastName());
        if(requestDto.getPassword() != null){
            user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        }
        Users updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser, UserResponseDto.class);
    }

    public RefreshTokenResponseDto generateRefreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new InvalidCredentialsException("Refresh token is missing.");
        }
        RefreshToken storedToken = refreshTokenRepository
                .findByToken(refreshToken)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid refresh token"));

        if (storedToken.isRevoked()) {
            throw new InvalidCredentialsException("Refresh token has been revoked.");
        }

        if (storedToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(storedToken);
            throw new InvalidCredentialsException("Refresh token has expired.");
        }
        Users user = storedToken.getUser();
        refreshTokenRepository.delete(storedToken);
        RefreshToken newRefreshToken = createRefreshToken(user);
        refreshTokenRepository.save(newRefreshToken);

        cookieUtil.addRefreshCookie(
                response,
                newRefreshToken.getToken(),
                (int) (refreshTokenExpiration / 1000)
        );

        String accessToken = jwtService.generateAccessToken(
                user.getId(),
                user.getEmail()
        );
        return RefreshTokenResponseDto
                .builder()
                .token(accessToken)
                .build();
    }

    public void logoutUser(String token, HttpServletResponse response) {
        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new BadCredentialsException("Missing refresh token"));
        refreshTokenRepository.delete(refreshToken);
        cookieUtil.clearRefreshCookie(response);
    }

    public UserResponseDto profile() {
        Long userId = currentUserService.getUserId();
        if (userId == null) {
            throw new ResourceNotFoundException("User not found");
        }
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.map(user, UserResponseDto.class);
    }

    private RefreshToken createRefreshToken(Users user) {
        String token = generateRandomToken();
        return RefreshToken
                .builder()
                .token(token)
                .user(user)
                .revoked(false)
                .expiryDate(
                        LocalDateTime.now()
                                .plusSeconds(refreshTokenExpiration / 1000)
                )
                .build();
    }

    private String generateRandomToken() {

        byte[] bytes = new byte[64];

        new SecureRandom().nextBytes(bytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(bytes);
    }
}
