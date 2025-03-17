package com.example.Backend.service;

import com.example.Backend.dto.UserDTO;
import com.example.Backend.model.UserEntity;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO getUserDetails(Long userId) {
        Optional<UserEntity> userEntity = userRepository.findById(userId);

        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            return mapUserToDTO(user);
        }

        return null;
    }

    public UserDTO updateNameAndSurname(Long userId, String newName, String newSurname) {
        Optional<UserEntity> userEntity = userRepository.findById(userId);

        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            user.setName(newName);
            user.setSurname(newSurname);

            userRepository.save(user);
            return mapUserToDTO(user);
        }

        return null;
    }

    public UserDTO updateEmail(Long userId, String newEmail) {
        Optional<UserEntity> userEntity = userRepository.findById(userId);

        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            user.setEmail(newEmail);

            userRepository.save(user);
            return mapUserToDTO(user);
        }

        return null;
    }

    private UserDTO mapUserToDTO(UserEntity userEntity) {
        return new UserDTO(
                userEntity.getId(),
                userEntity.getEmail(),
                userEntity.getName(),
                userEntity.getSurname(),
                userEntity.getNetWorth(),
                userEntity.getBankAccount().getId()
        );
    }

}
