package com.aman.urlshortner.controller;

import com.aman.urlshortner.dto.request.LoginRequestDto;
import com.aman.urlshortner.dto.request.RegisterRequestDto;
import com.aman.urlshortner.dto.response.*;
import com.aman.urlshortner.service.AuthService;
import com.aman.urlshortner.utils.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final CookieUtil cookieUtil;

    @PostMapping("/register") // register
    public ResponseEntity<ApiResponse<RegisterResponseDto>> register(@RequestBody @Valid RegisterRequestDto registerRequestDto) {
        System.out.println("registerRequestDto: " + registerRequestDto);
        return ApiResponse.created("User created", authService.registerUser(registerRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
            @Valid @RequestBody LoginRequestDto loginRequestDto,
            HttpServletResponse response) {
        return ApiResponse.ok(
                "User logged in success",
                authService.loginUser(loginRequestDto, response
                )
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<RefreshTokenResponseDto>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String token = cookieUtil.getRefreshToken(request);
        return ApiResponse.ok(authService.generateRefreshToken(token, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String token = cookieUtil.getRefreshToken(request);
        authService.logoutUser(token, response);
        return ApiResponse.noContent("User logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponseDto>> profile() {
        return ApiResponse.ok("User data fetched", authService.profile());
    }
}
