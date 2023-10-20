package com.expense_tracker.services;

import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.repositories.CategoryRepository;
import com.expense_tracker.repositories.ExpenseRepository;
import com.expense_tracker.repositories.NotesRepository;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public void deleteUser(Long userId) {
        categoryRepository.deleteAllByUserId(userId);
        expenseRepository.deleteAllByUserId(userId);
        notesRepository.deleteAllByUserId(userId);
        userRepository.deleteById(userId);
    }
}
