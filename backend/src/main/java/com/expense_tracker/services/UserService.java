package com.expense_tracker.services;

import com.expense_tracker.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ExpenseRepository expenseRepository;

    @Autowired
    IncomeRepository incomeRepository;

    @Autowired
    NotesRepository notesRepository;

    public void deleteUser(Long userId) {
        var expenses = expenseRepository.findByUserIdOrderByDate(userId);
        expenseRepository.deleteAll(expenses);

        var incomes = incomeRepository.findByUserIdOrderByDate(userId);
        incomeRepository.deleteAll(incomes);

        var categories = categoryRepository.findByUserId(userId);
        categoryRepository.deleteAll(categories);

        var notes = notesRepository.findByUserId(userId);
        notesRepository.deleteAll(notes);

        userRepository.deleteById(userId);
    }
}
