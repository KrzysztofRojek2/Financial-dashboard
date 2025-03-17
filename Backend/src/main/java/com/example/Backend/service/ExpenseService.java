package com.example.Backend.service;

import com.example.Backend.dto.ExpenseDTO;
import com.example.Backend.model.Expense;
import com.example.Backend.model.UserEntity;
import com.example.Backend.repository.ExpenseRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public ExpenseDTO mapExpenseToDTO(Expense expense) {
        if (expense == null) {
            return null;
        }
        return new ExpenseDTO(
                expense.getId(),
                expense.getName(),
                expense.getCost(),
                expense.getUser() != null ? expense.getUser().getId() : null
        );
    }

    public List<ExpenseDTO> getAllExpensesByUserId(Long userId) {
        List<Expense> expenses = expenseRepository.findAllByUser_Id(userId);

        List<Expense> sortedExpenses = sortExpensesByCostDesc(expenses);

        return sortedExpenses.stream()
                .map(this::mapExpenseToDTO)
                .collect(Collectors.toList());
    }

    private List<Expense> sortExpensesByCostDesc(List<Expense> expenses) {
        return expenses.stream()
                .sorted((e1, e2) -> e2.getCost().compareTo(e1.getCost()))
                .collect(Collectors.toList());
    }

    public ExpenseDTO addExpense(ExpenseDTO expenseDTO, Long userId) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found with ID: " + expenseDTO.getUserId());
        }

        Expense newExpense = new Expense(expenseDTO.getName(), expenseDTO.getCost(), userOptional.get());
        Expense savedExpense = expenseRepository.save(newExpense);
        return mapExpenseToDTO(savedExpense);
    }

    public ExpenseDTO updateExpense(Long expenseId, ExpenseDTO expenseDTO) {
        Optional<Expense> expenseOptional = expenseRepository.findById(expenseId);
        if (expenseOptional.isEmpty()) {
            throw new IllegalArgumentException("Expense not found with ID: " + expenseId);
        }

        Expense existingExpense = expenseOptional.get();
        existingExpense.setName(expenseDTO.getName());
        existingExpense.setCost(expenseDTO.getCost());

        Expense updatedExpense = expenseRepository.save(existingExpense);
        return mapExpenseToDTO(updatedExpense);
    }

    public void deleteExpense(Long expenseId) {
        if (!expenseRepository.existsById(expenseId)) {
            throw new IllegalArgumentException("Expense not found with ID: " + expenseId);
        }
        expenseRepository.deleteById(expenseId);
    }
}
