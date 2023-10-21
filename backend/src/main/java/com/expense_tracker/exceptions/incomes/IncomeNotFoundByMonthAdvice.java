package com.expense_tracker.exceptions.incomes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class IncomeNotFoundByMonthAdvice {
    @ResponseBody
    @ExceptionHandler(IncomeNotFoundByMonthException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String incomeNotFoundHandler(IncomeNotFoundByMonthException ex) {
        return ex.getMessage();
    }
}
