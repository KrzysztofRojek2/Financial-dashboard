package com.example.Backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountBalanceHistoryDTO {
    private Long id;
    private LocalDate month;
    private BigDecimal balance;
}
