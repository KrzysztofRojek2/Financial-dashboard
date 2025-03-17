package com.example.Backend.controller;

import com.example.Backend.dto.TransactionDTO;
import com.example.Backend.dto.TransactionSummaryDTO;
import com.example.Backend.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.19:8081" , "http://localhost:8081"})
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/monthly-summary/{userId}")
    public List<TransactionSummaryDTO> getMonthlySummary(@PathVariable Long userId) {
        return transactionService.getMonthlySummary(userId);
    }

    @GetMapping("/yearly-summary/{userId}")
    public List<TransactionSummaryDTO> getYearlySummary(@PathVariable Long userId) {
        return transactionService.getYearlySummary(userId);
    }

    @GetMapping("/latest/{userId}")
    public List<TransactionDTO> getLatestTransactions(@PathVariable Long userId) {
        return transactionService.getLatestTransactions(userId);
    }

}
