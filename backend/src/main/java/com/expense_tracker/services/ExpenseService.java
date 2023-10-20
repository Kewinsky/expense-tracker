package com.expense_tracker.services;

import com.expense_tracker.models.Expense;
import com.expense_tracker.payloads.responses.ExpenseResponse;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<ExpenseResponse> getExpensesWithCategory(Long userId) {
        List<ExpenseResponse> expensesWithCategory = new ArrayList<>();

        List<Expense> expenses = expenseRepository.findByUserIdOrderByDate(userId);

        for (Expense expense : expenses) {
            ExpenseResponse response = new ExpenseResponse();

            var category = categoryRepository.findById(expense.getCategoryId()).orElse(null);

            response.setId(expense.getId());
            response.setTitle(expense.getTitle());
            response.setValue(expense.getValue());
            if (category != null) {
                response.setCategory(category.getTitle());
            }
            response.setDate(expense.getDate());

            expensesWithCategory.add(response);
        }

        return expensesWithCategory;
    }
}
