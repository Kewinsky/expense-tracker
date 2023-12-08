package com.expense_tracker.services;

import com.expense_tracker.exceptions.categories.CategoryCannotBeDeletedException;
import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.Category;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Category> getCategories(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return categoryRepository.findByUserId(id);
    }

    public void addCategory(Category category) {
        var userId = category.getUser().getId();

        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        categoryRepository.save(category);
    }

    public String updateCategory(Long id, Category updatedCategory) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setTitle(updatedCategory.getTitle());
                    categoryRepository.save(existingCategory);
                    return "Category updated successfully";
                })
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

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
