package com.expense_tracker.exceptions.categories;

public class CategoryCannotBeDeleted extends RuntimeException {
    public CategoryCannotBeDeleted() {
        super("At least one category is required");
    }
}
