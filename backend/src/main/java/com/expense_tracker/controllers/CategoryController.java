package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.models.Category;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
@PreAuthorize("hasRole('USER')")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    UserController userController;

    @GetMapping(path = "/getCategoryById/{id}")
    @ResponseBody
    Category getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @GetMapping(path = "/getCategoriesByUser/{id}")
    @ResponseBody
    List<Category> getCategoriesByUser(@PathVariable Long id) {
        userController.getUserById(id);

        return categoryRepository.findByUserId(id);
    }

    @PostMapping(path = "/addCategory")
    String addCategory(@RequestBody Category category) {
        userController.getUserById(category.getUserId());
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
    ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
}
