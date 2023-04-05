package com.expense_tracker.controllers;

import com.expense_tracker.entities.Category;
import com.expense_tracker.exceptions.categories.CategoryNotFoundException;
import com.expense_tracker.repositories.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoriesRepository repository;

    @GetMapping(path="/getCategories")
    @ResponseBody Iterable<Category> getCategories() {
        return repository.findAll();
    }

    @GetMapping(path="/getCategoryById/{id}")
    Category getCategoryById(@PathVariable int id) {
        return repository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @PostMapping("/addCategory")
    String addCategory(@RequestBody Category category) {
        repository.save(category);
        return "Category " + category.getTitle() + " added.";
    }

    @PutMapping("updateCategory/{id}")
    String updateCategory(@RequestBody Category category,
                         @PathVariable int id){
        return repository.findById(id)
                .map(cat -> {
                    cat.setTitle(category.getTitle());
                    repository.save(cat);
                    return "Category " + category.getTitle() + " updated.";
                })
                .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @DeleteMapping("/deleteCategory/{id}")
    String deleteCategory(@PathVariable int id) {
        if (!repository.existsById(id)){
            throw new CategoryNotFoundException(id);
        }
        repository.deleteById(id);
        return "Category with id: " + id + " has been removed.";
    }
}
