package com.expense_tracker.exceptions;

public class ExpenseNotFoundException extends RuntimeException{
    public ExpenseNotFoundException(int id) {
        super("Could not find expense with id: " + id);
    }
}
