package com.example.Backend.controller;

import com.example.Backend.dto.BankAccountDTO;
import com.example.Backend.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/banks")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.19:8081" , "http://localhost:8081"})
public class BankController {
    private final BankAccountService bankAccountService;

    @GetMapping("/{id}")
    public ResponseEntity<BankAccountDTO> getBankAccount(@PathVariable Long id) {
        try {
            BankAccountDTO bankAccountDTO = bankAccountService.getBankAccountDTO(id);
            return ResponseEntity.ok(bankAccountDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
