package com.example.Backend.repository;

import com.example.Backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findTop3ByBankAccount_User_IdOrderByDateDesc(Long userId);

    List<Transaction> findByBankAccount_User_IdAndDateBetween(Long userId, LocalDateTime start, LocalDateTime end);

}
