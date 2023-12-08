package com.expense_tracker.services;

import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.Expense;
import com.expense_tracker.payloads.responses.ExpenseResponse;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<ExpenseResponse> getExpensesWithCategory(Long userId) {
        List<ExpenseResponse> expensesWithCategory = new ArrayList<>();

        List<Expense> expenses = expenseRepository.findByUserIdOrderByDate(userId);

        for (Expense expense : expenses) {
            ExpenseResponse response = new ExpenseResponse();

            response.setId(expense.getId());
            response.setTitle(expense.getTitle());
            response.setValue(expense.getValue());
            response.setCategory(expense.getCategory().getTitle());
            response.setDate(expense.getDate());
            response.setUserId(expense.getUser().getId());

            expensesWithCategory.add(response);
        }

        return expensesWithCategory;
    }

    public void addExpense(Expense expense) {
        var userId = expense.getUser().getId();

        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        expenseRepository.save(expense);
    }

    public String updateExpense(Long id, Expense updateExpense) {
        return expenseRepository.findById(id)
                .map(exp -> {
                    exp.setTitle(updateExpense.getTitle());
                    exp.setValue(updateExpense.getValue());
                    exp.setCategory(updateExpense.getCategory());
                    exp.setDate(updateExpense.getDate());
                    expenseRepository.save(exp);
                    return "Expense updated successfully";
                })
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    public void deleteExpense(Long expenseId) {
        if (!expenseRepository.existsById(expenseId)) {
            throw new ExpenseNotFoundException(expenseId);
        }
        expenseRepository.deleteById(expenseId);
    }
}
