package com.example.Backend.service;

import com.example.Backend.dto.BankAccountDTO;
import com.example.Backend.dto.AccountBalanceHistoryDTO;
import com.example.Backend.model.BankAccount;
import com.example.Backend.repository.BankAccountRepository;
import com.example.Backend.repository.AccountBalanceHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final AccountBalanceHistoryRepository balanceHistoryRepository;

    public BankAccountDTO getBankAccountDTO(Long id) {
        System.out.println("Rozpoczęcie metody getBankAccountDTO dla ID: " + id);

        BankAccount bankAccount = bankAccountRepository.findById(id)
                .orElseThrow(() -> {
                    System.out.println("Błąd: Konto bankowe o ID " + id + " nie zostało znalezione.");
                    return new RuntimeException("Bank Account not found");
                });

        System.out.println("Pobrano konto bankowe: ID = " + bankAccount.getId() + ", Saldo = " + bankAccount.getBalance());

        String bankName = bankAccount.getBank().getName();
        System.out.println("Nazwa banku: " + bankName);

        List<AccountBalanceHistoryDTO> balanceHistoryDTO = balanceHistoryRepository.findByBankAccountId(id).stream()
                .map(history -> new AccountBalanceHistoryDTO(
                        history.getId(),
                        history.getMonth(),
                        history.getBalance()
                ))
                .collect(Collectors.toList());

        BankAccountDTO bankAccountDTO = new BankAccountDTO(
                bankAccount.getId(),
                bankName,
                bankAccount.getBalance(),
                balanceHistoryDTO
        );

        System.out.println("Zwracany BankAccountDTO: ID = " + bankAccountDTO.getId() +
                ", Bank Name = " + bankAccountDTO.getBankName() +
                ", Saldo = " + bankAccountDTO.getBalance() +
                ", Liczba zapisów historii = " + bankAccountDTO.getBalanceHistory().size());

        return bankAccountDTO;
    }
}
