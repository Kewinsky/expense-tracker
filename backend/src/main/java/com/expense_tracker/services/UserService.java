package com.expense_tracker.services;

import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.User;
import com.expense_tracker.payloads.requests.SignupRequest;
import com.expense_tracker.repositories.*;
import com.expense_tracker.utils.RoleConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    NoteRepository noteRepository;

    @Autowired
    private RoleConverter converter;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public String updateProfile(Long userId, User updateProfile) {
        return userRepository.findById(userId)
                .map(user1 -> {
                    user1.setUsername(updateProfile.getUsername());
                    user1.setEmail(updateProfile.getEmail());
                    userRepository.save(user1);
                    return "User profile updated successfully";
                })
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    public String updateUser(Long userId, SignupRequest updateUser) {
        return userRepository.findById(userId)
                .map(user1 -> {
                    user1.setUsername(updateUser.getUsername());
                    user1.setEmail(updateUser.getEmail());
                    user1.setRoles(converter.toRoleSet(updateUser.getRole()));
                    userRepository.save(user1);
                    return "User updated successfully";
                })
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    public void deleteUser(Long userId) {

        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }

        var expenses = expenseRepository.findByUserIdOrderByDate(userId);
        expenseRepository.deleteAll(expenses);

        var incomes = incomeRepository.findByUserIdOrderByDate(userId);
        incomeRepository.deleteAll(incomes);

        var categories = categoryRepository.findByUserId(userId);
        categoryRepository.deleteAll(categories);

        var notes = noteRepository.findByUserId(userId);
        noteRepository.deleteAll(notes);

        userRepository.deleteById(userId);
    }
}
