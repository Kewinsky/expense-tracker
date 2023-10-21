package com.expense_tracker.exceptions.incomes;

import java.time.Month;

public class IncomeNotFoundException extends RuntimeException {
    public IncomeNotFoundException(int year, Month month) {
        super(String.format("Could not find income from %s %d", month, year));
    }
}
