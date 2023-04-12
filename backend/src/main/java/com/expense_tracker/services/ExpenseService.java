package com.expense_tracker.services;

import com.expense_tracker.repositories.ExpensesRepository;
import com.expense_tracker.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ExpenseService {

    @Autowired
    private ExpensesRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(ExpenseService.class);


}
