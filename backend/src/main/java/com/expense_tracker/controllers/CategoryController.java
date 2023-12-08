package com.expense_tracker.controllers;

import com.expense_tracker.models.Category;
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
    CategoryService categoryService;

    @GetMapping("/getCategoriesByUser/{id}")
    @ResponseBody
    ResponseEntity<List<Category>> getCategoriesByUser(@PathVariable Long id) {
        var result = categoryService.getCategories(id);

        return ResponseEntity.ok(result);
    }


    @PostMapping("/addCategory")
    ResponseEntity<String> addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);

        return ResponseEntity.ok("Category added successfully");
    }

    @PutMapping("updateCategory/{id}")
    public ResponseEntity<String> updateCategory(@RequestBody Category category, @PathVariable Long id) {
        var result = categoryService.updateCategory(id, category);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteCategory/{id}")
    ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);

        return ResponseEntity.ok("Category deleted successfully");
    }
}
