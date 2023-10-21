package com.expense_tracker.exceptions.incomes;

public class IncomeNotFoundException extends RuntimeException {
    public IncomeNotFoundException(Long id) {
        super("Could not find income with id: " + id);
    }
}
