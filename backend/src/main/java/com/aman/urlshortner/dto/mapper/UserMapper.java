package com.aman.urlshortner.dto.mapper;

import com.aman.urlshortner.dto.request.RegisterRequestDto;
import com.aman.urlshortner.dto.response.LoginResponseDto;
import com.aman.urlshortner.dto.response.RegisterResponseDto;
import com.aman.urlshortner.dto.response.UserResponseDto;
import com.aman.urlshortner.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public Users mapToEntity(RegisterRequestDto registerRequestDto) {
        return Users
                .builder()
                .firstName(registerRequestDto.getFirstName())
                .lastName(registerRequestDto.getLastName())
                .email(registerRequestDto.getEmail())
                .password(encoder.encode(registerRequestDto.getPassword()))
                .build();
    }

    public RegisterResponseDto mapToRegisterResponseDto(Users savedUser) {
        return RegisterResponseDto
                .builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    public LoginResponseDto mapToLoginResponseDto(Users user, String token) {
        return LoginResponseDto
                .builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .token(token)
                .build();
    }

    public UserResponseDto mapToUserResponseDto(Users user) {
        return UserResponseDto
                .builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
