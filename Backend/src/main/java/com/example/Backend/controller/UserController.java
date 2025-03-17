package com.example.Backend.controller;

import com.example.Backend.dto.UserDTO;
import com.example.Backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.19:8081" , "http://localhost:8081"})
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserDetails(id);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PatchMapping("/{id}/name-surname")
    public ResponseEntity<UserDTO> updateUserNameAndSurname(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String surname) {

        UserDTO updatedUser = userService.updateNameAndSurname(id, name, surname);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PatchMapping("/{id}/email")
    public ResponseEntity<UserDTO> updateUserEmail(
            @PathVariable Long id,
            @RequestParam String email) {

        UserDTO updatedUser = userService.updateEmail(id, email);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
