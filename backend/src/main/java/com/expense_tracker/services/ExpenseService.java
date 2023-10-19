package com.expense_tracker.services;

import com.expense_tracker.DTOs.ExpenseDTO;
import com.expense_tracker.models.Expense;
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

    public List<ExpenseDTO> getExpensesWithCategory(Long userId) {
        List<ExpenseDTO> expensesWithCategory = new ArrayList<>();

        List<Expense> expenses = expenseRepository.findByUserIdOrderByDate(userId);

        for (Expense expense : expenses) {
            ExpenseDTO dto = new ExpenseDTO();

            var category = categoryRepository.findById(expense.getCategoryId()).orElse(null);

            dto.setId(expense.getId());
            dto.setTitle(expense.getTitle());
            dto.setValue(expense.getValue());
            if (category != null) {
                dto.setCategory(category.getTitle());
            }
            dto.setDate(expense.getDate());

            expensesWithCategory.add(dto);
        }

        return expensesWithCategory;
    }
}
