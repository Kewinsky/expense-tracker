package com.expense_tracker.exceptions.categories;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Could not find category with id: " + id);
    }
}
