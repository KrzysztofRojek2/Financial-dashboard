package com.example.Backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BankAccountDTO {
    private Long id;
    private String bankName;
    private BigDecimal balance;
    private List<AccountBalanceHistoryDTO> balanceHistory;
}
