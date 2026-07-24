package com.aman.urlshortner.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URI;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private Boolean success;
    private String message;
    private T data;

    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {
        return ResponseEntity.ok(
                ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .data(data)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ok("Request successful", data);
    }

    public static ResponseEntity<ApiResponse<Void>> ok(String message) {
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message(message)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .data(data)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return created("Resource created successfully", data);
    }

    public static <T> ResponseEntity<ApiResponse<T>> noContent(String message) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                ApiResponse.<T>builder()
                        .success(true)
                        .message(message)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> badRequest(String message, T data) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiResponse.<T>builder()
                        .success(false)
                        .message(message)
                        .data(data)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> badRequest(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> unauthorized(String message) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> forbidden(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> conflict(String message, T data) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponse.<T>builder()
                        .success(false)
                        .message(message)
                        .data(data)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> conflict(String message) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> internalServerError(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> serviceUnavailable(String message) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> failure(HttpStatus status, String message, T data) {
        return ResponseEntity.status(status).body(
                ApiResponse.<T>builder()
                        .success(false)
                        .message(message)
                        .data(data)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> failure(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(
                ApiResponse.<Void>builder()
                        .success(false)
                        .message(message)
                        .build()
        );
    }

    public static ResponseEntity<ApiResponse<Void>> redirect(String targetUrl) {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(targetUrl))
                .build();
    }
}