package com.expense_tracker.exceptions.incomes;

import java.time.Month;

public class IncomeNotFoundByMonthException extends RuntimeException {
    public IncomeNotFoundByMonthException(int year, Month month) {
        super(String.format("Could not find income from %s %d", month, year));
    }
}
