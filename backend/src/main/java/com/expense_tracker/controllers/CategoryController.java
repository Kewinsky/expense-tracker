package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.models.Category;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
@PreAuthorize("hasRole('USER')")
public class CategoryController {
    @Autowired
    UserController userController;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @GetMapping("/getCategoriesByUser/{id}")
    @ResponseBody
    List<Category> getCategoriesByUser(@PathVariable Long id) {
        userController.getUserById(id);

        return categoryRepository.findByUserId(id);
    }

    @PostMapping("/addCategory")
    String addCategory(@RequestBody Category category) {
        userController.getUserById(category.getUser().getId());
        categoryRepository.save(category);

        return "Category added successfully";
    }

    @PutMapping("updateCategory/{id}")
    String updateCategory(@RequestBody Category category,
                          @PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(cat -> {
                    cat.setTitle(category.getTitle());
                    categoryRepository.save(cat);
                    return "Category updated successfully";
                })
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @DeleteMapping("/deleteCategory/{id}")
    String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);

        return "Category deleted successfully";
    }
}
