package com.example.Backend.service;

import com.example.Backend.dto.AuthRequest;
import com.example.Backend.dto.RegisterRequest;
import com.example.Backend.model.UserEntity;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDataInitializer userDataInitializer;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDataInitializer userDataInitializer) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDataInitializer = userDataInitializer;
    }

    public ResponseEntity<?> register(@Valid RegisterRequest registerRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid input data"));
        }

        Optional<UserEntity> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Użytkownik już istnieje!"));
        }

        UserEntity newUser = new UserEntity(
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                null,
                null,
                UserDataInitializer.generateRandomBigDecimal(50000)
        );

        userRepository.save(newUser);
        userDataInitializer.initializeUserData(newUser);

        return ResponseEntity.status(201).body(Collections.singletonMap("message", "Rejestracja zakończona sukcesem!"));
    }

    public ResponseEntity<?> login(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            UserEntity user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(authRequest.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", "Bearer " + token);
            response.put("userId", user.getId());

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "Nieprawidłowe dane logowania"));
        }
    }


}
