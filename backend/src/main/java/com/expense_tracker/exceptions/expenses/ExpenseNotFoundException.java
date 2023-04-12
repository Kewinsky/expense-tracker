package com.expense_tracker.exceptions.expenses;

public class ExpenseNotFoundException extends RuntimeException{
    public ExpenseNotFoundException(Long id) {
        super("Could not find expense with id: " + id);
    }
}
