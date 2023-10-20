package com.expense_tracker.exceptions.categories;

public class CategoryCannotBeDeletedException extends RuntimeException {
    public CategoryCannotBeDeletedException() {
        super("At least one category is required");
    }
}
