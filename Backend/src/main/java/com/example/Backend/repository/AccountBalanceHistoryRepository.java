package com.example.Backend.repository;

import com.example.Backend.model.AccountBalanceHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountBalanceHistoryRepository extends JpaRepository<AccountBalanceHistory, Long> {

    List<AccountBalanceHistory> findByBankAccountId(Long id);
}
