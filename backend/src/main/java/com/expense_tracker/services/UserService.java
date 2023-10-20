package com.expense_tracker.services;

import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import com.expense_tracker.repositories.NotesRepository;
import com.expense_tracker.repositories.UserRepository;
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
    NotesRepository notesRepository;

    public void deleteUser(Long userId) {
        var expenses = expenseRepository.findByUserIdOrderByDate(userId);
        expenseRepository.deleteAll(expenses);

        var categories = categoryRepository.findByUserId(userId);
        categoryRepository.deleteAll(categories);

        var notes = notesRepository.findByUserId(userId);
        notesRepository.deleteAll(notes);

        userRepository.deleteById(userId);
    }
}
