package com.aman.urlshortner.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRequestDto {
    @NotBlank(message = "First name is required")
    @Size(min = 3, message = "First name should be at least 2 character long")
    private String firstName;

    @Size(min = 3, message = "Last name should be at least 2 character long")
    private String lastName;

    private String password;
}
