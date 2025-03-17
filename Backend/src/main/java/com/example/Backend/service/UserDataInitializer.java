package com.example.Backend.service;

import com.example.Backend.model.*;
import com.example.Backend.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserDataInitializer {

    private final BankRepository bankRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final ExpenseRepository expenseRepository;
    private final AssetRepository assetRepository;
    private final AccountBalanceHistoryRepository accountBalanceHistoryRepository;
    private static final Random random = new Random();

    public UserDataInitializer(
            BankRepository bankRepository,
            BankAccountRepository bankAccountRepository,
            TransactionRepository transactionRepository,
            ExpenseRepository expenseRepository,
            AssetRepository assetRepository,
            AccountBalanceHistoryRepository accountBalanceHistoryRepository
    ) {
        this.bankRepository = bankRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.expenseRepository = expenseRepository;
        this.assetRepository = assetRepository;
        this.accountBalanceHistoryRepository = accountBalanceHistoryRepository;
    }

    public void initializeUserData(UserEntity user) {
        BankAccount bankAccount = createBankAccount(user);
        createBankAccountBalanceHistory(bankAccount);
        createTransactions(bankAccount);
        createExpenses(user);
        createAssets(user);
    }

    private BankAccount createBankAccount(UserEntity user) {
        List<Bank> banks = bankRepository.findAll();
        if (banks.isEmpty()) {
            throw new RuntimeException("No banks available in the database!");
        }

        Bank randomBank = banks.get(random.nextInt(banks.size()));

        BankAccount bankAccount = new BankAccount();
        bankAccount.setUser(user);
        bankAccount.setBank(randomBank);
        bankAccount.setBalance(generateRandomBigDecimal(20000));

        bankAccountRepository.save(bankAccount);
        return bankAccount;
    }

    private void createTransactions(BankAccount bankAccount) {
        LocalDateTime startOfYear = LocalDateTime.of(LocalDateTime.now().getYear(), 1, 1, 2, 12);
        for (int day = 0; day < 365; day++) {
            LocalDateTime date = startOfYear.plusDays(day);

            Transaction income = new Transaction(null, "Income", date, generateRandomBigDecimal(5000), true, bankAccount);
            transactionRepository.save(income);

            Transaction expense = new Transaction(null, "Expense", date, generateRandomBigDecimal(5000).negate(), false, bankAccount);
            transactionRepository.save(expense);
        }
    }

    private void createBankAccountBalanceHistory(BankAccount bankAccount) {
        int year = LocalDate.now().getYear();
        for (int month = 1; month <= 12; month++) {
            AccountBalanceHistory history = new AccountBalanceHistory();
            history.setBankAccount(bankAccount);
            history.setMonth(LocalDate.of(year, month, 1));
            history.setBalance(generateRandomBigDecimal(20000));
            accountBalanceHistoryRepository.save(history);
        }
    }

    private void createExpenses(UserEntity user) {
        List<String> expenseNames = Arrays.asList("Legal Fees", "Insurance", "Office Supplies", "Travel",
                "Utilities", "Materials", "Marketing", "SaaS");

        for (String name : expenseNames) {
            Expense expense = new Expense(name, generateRandomBigDecimal(1000), user);
            expenseRepository.save(expense);
        }
    }

    private void createAssets(UserEntity user) {
        List<String> assetNames = Arrays.asList("Real Estate", "Cash", "Gold", "Crypto Currency", "Stock");
        List<String> assetColors = Arrays.asList("#2E86C1", "#28B463", "#F1C40F", "#E74C3C", "#8E44AD");

        for (int i = 0; i < assetNames.size(); i++) {
            Asset asset = new Asset(assetNames.get(i), generateRandomBigDecimal(50000), assetColors.get(i), user);
            assetRepository.save(asset);
        }
    }

    public static BigDecimal generateRandomBigDecimal(double maxValue) {
        return BigDecimal.valueOf(random.nextDouble()).multiply(BigDecimal.valueOf(maxValue));
    }
}
