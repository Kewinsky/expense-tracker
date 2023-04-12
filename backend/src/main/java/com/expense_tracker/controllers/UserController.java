package com.expense_tracker.controllers;

import com.expense_tracker.models.User;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getUsers")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path="/getUserById/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/user/me")
    public Object getCurrentUser() {
        Object userPrincipal =  SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userPrincipal;
    }




}
