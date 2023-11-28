package com.expense_tracker.utils;

import com.expense_tracker.models.Category;
import com.expense_tracker.models.User;
import com.expense_tracker.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryProvider {
    @Autowired
    CategoryRepository categoryRepository;

    public void addPredefinedCategoriesToUser(User user) {
        List<String> predefinedCategoryTitles = Arrays.asList(
                "Food",
                "Transport",
                "Utilities",
                "Personal",
                "Housing",
                "Medical",
                "Entertainment",
                "Gifts"
        );

        for (String categoryTitle : predefinedCategoryTitles) {
            Category category = new Category();

            category.setTitle(categoryTitle);
            category.setUser(user);

            categoryRepository.save(category);
        }
    }
}
