package com.expense_tracker.services;

import com.expense_tracker.exceptions.categories.CategoryCannotBeDeleted;
import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.payloads.responses.MessageResponse;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public ResponseEntity<?> deleteCategory(Long categoryId) {
        var category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        var expenses = expenseRepository.findByCategoryId(category.getId());
        expenseRepository.deleteAll(expenses);

        var userCategories = categoryRepository.findByUserId(category.getUserId());

        if (userCategories.size() > 1) {
            categoryRepository.deleteById(category.getId());
            return ResponseEntity
                    .ok()
                    .body(new MessageResponse("Category deleted successfully"));
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("At least one category is required!"));
        }
    }
}
