package com.example.Backend.service;

import com.example.Backend.dto.TransactionDTO;
import com.example.Backend.dto.TransactionSummaryDTO;
import com.example.Backend.model.Transaction;
import com.example.Backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService{

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public TransactionDTO mapTransactionToDTO(Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setId(transaction.getId());
        transactionDTO.setAmount(transaction.getAmount());
        transactionDTO.setDate(transaction.getDate());
        transactionDTO.setName(transaction.getName());
        transactionDTO.setBankAccountId(transaction.getBankAccount().getId());
        return transactionDTO;
    }


    public List<TransactionSummaryDTO> getMonthlySummary(Long userId) {
        LocalDate now = LocalDate.now();
        YearMonth currentMonth = YearMonth.of(now.getYear(), now.getMonth());

        List<Transaction> transactions = transactionRepository.findByBankAccount_User_IdAndDateBetween(
                userId,
                currentMonth.atDay(1).atStartOfDay(),
                currentMonth.atEndOfMonth().atTime(23, 59, 59)
        );

        return calculateSummary(transactions, 30, true);
    }

    public List<TransactionSummaryDTO> getYearlySummary(Long userId) {
        int currentYear = LocalDate.now().getYear();

        List<Transaction> transactions = transactionRepository.findByBankAccount_User_IdAndDateBetween(
                userId,
                LocalDate.of(currentYear, 1, 1).atStartOfDay(),
                LocalDate.of(currentYear, 12, 31).atTime(23, 59, 59) // Cały rok, nawet jeśli mamy np. marzec
        );

        return calculateSummary(transactions, 12, false);
    }

    public List<TransactionDTO> getLatestTransactions(Long userId) {
        List<Transaction> transactions = transactionRepository.findTop3ByBankAccount_User_IdOrderByDateDesc(userId);

        return transactions.stream()
                .map(this::mapTransactionToDTO)
                .collect(Collectors.toList());
    }

    private List<TransactionSummaryDTO> calculateSummary(List<Transaction> transactions, int size, boolean isDaily) {
        Map<Integer, TransactionSummaryDTO> summary = new HashMap<>();

        for (int i = 1; i <= size; i++) {
            summary.put(i, new TransactionSummaryDTO(i, BigDecimal.ZERO, BigDecimal.ZERO));
        }

        for (Transaction transaction : transactions) {
            int period = isDaily ? transaction.getDate().getDayOfMonth() : transaction.getDate().getMonthValue();

            TransactionSummaryDTO summaryDTO = summary.get(period);
            if (summaryDTO == null) {
                summaryDTO = new TransactionSummaryDTO(period, BigDecimal.ZERO, BigDecimal.ZERO);
                summary.put(period, summaryDTO);
            }

            BigDecimal amount = transaction.getAmount();
            if (amount.compareTo(BigDecimal.ZERO) > 0) {
                summaryDTO.setIncome(summaryDTO.getIncome().add(amount));
            } else {
                summaryDTO.setExpense(summaryDTO.getExpense().add(amount.abs()));
            }
        }
        return new ArrayList<>(summary.values());
    }

}