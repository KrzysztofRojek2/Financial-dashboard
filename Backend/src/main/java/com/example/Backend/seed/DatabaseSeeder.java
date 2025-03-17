package com.example.Backend.seed;

import com.example.Backend.model.*;
import com.example.Backend.repository.*;
import com.example.Backend.service.UserDataInitializer;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DatabaseSeeder {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BankRepository bankRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDataInitializer userDataInitializer;

    @PostConstruct
    public void seedDatabase() {
        if (userRepository.count() == 0) {
            createBanks();

            for (int i = 1; i <= 2; i++) {
                UserEntity user = new UserEntity(
                        "user" + i + "@example.com",
                        passwordEncoder.encode("hashedpassword"),
                        "User" + i,
                        "Surname" + i,
                        UserDataInitializer.generateRandomBigDecimal(50000)
                );
                userRepository.save(user);
                userDataInitializer.initializeUserData(user);
            }

            System.out.println("✅ Database seeded successfully!");
        }
    }

    private void createBanks() {
        List<Bank> banks = Arrays.asList(
                new Bank(null, "Bank of America"),
                new Bank(null, "JP Morgan Chase")
        );
        bankRepository.saveAll(banks);
    }

}
