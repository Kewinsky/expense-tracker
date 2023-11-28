package com.expense_tracker.services;

import com.expense_tracker.exceptions.categories.CategoryCannotBeDeletedException;
import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public void deleteCategory(Long categoryId) {
        var category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        var expenses = expenseRepository.findByCategoryId(category.getId());
        expenseRepository.deleteAll(expenses);

        var userCategories = categoryRepository.findByUserId(category.getUser().getId());

        if (userCategories.size() > 1) {
            categoryRepository.deleteById(category.getId());
        } else {
            throw new CategoryCannotBeDeletedException();
        }
    }
}
