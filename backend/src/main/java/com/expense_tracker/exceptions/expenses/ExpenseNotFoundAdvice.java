package com.expense_tracker.exceptions.expenses;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExpenseNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(ExpenseNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String expenseNotFoundHandler(ExpenseNotFoundException ex) {
        return ex.getMessage();
    }
}
