package com.example.Backend.controller;

import com.example.Backend.dto.ExpenseDTO;
import com.example.Backend.service.ExpenseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.19:8081" , "http://localhost:8081"})
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping("/{userId}")
    public List<ExpenseDTO> getAllExpensesByUserId(@PathVariable Long userId) {
        return expenseService.getAllExpensesByUserId(userId);
    }

    @PostMapping("{userId}")
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO expenseDTO, @PathVariable Long userId) {
        ExpenseDTO createdExpense = expenseService.addExpense(expenseDTO, userId);
        return ResponseEntity.ok(createdExpense);
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ExpenseDTO> updateExpense(@PathVariable Long expenseId, @RequestBody ExpenseDTO expenseDTO) {
        ExpenseDTO updatedExpense = expenseService.updateExpense(expenseId, expenseDTO);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok("Expense deleted successfully.");
    }

}
