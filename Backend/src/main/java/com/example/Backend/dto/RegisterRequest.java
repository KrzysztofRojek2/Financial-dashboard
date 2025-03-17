package com.example.Backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Email can't be empty")
    @Email(message = "Incorrect email format")
    private String email;

    @NotBlank(message = "Password can't be empty")
    @Size(min = 6, message = "Password has to have at least 6 characters")
    private String password;

}
