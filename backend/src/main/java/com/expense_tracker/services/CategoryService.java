package com.expense_tracker.services;

import com.expense_tracker.exceptions.categories.CategoryCannotBeDeleted;
import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public void deleteCategory(Long categoryId) {
        var category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        var userId = category.getUserId();
        var userCategories = categoryRepository.findByUserId(userId);

        if (userCategories.size() > 1) {
            categoryRepository.delete(category);
        } else {
            throw new CategoryCannotBeDeleted();
        }
    }
}
