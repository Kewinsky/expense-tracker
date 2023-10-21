package com.expense_tracker.exceptions.incomes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class IncomeNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(IncomeNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String incomeNotFoundHandler(IncomeNotFoundException ex) {
        return ex.getMessage();
    }
}
