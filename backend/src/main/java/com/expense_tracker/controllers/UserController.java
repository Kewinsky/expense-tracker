package com.expense_tracker.controllers;


import com.expense_tracker.entities.Expense;
import com.expense_tracker.entities.User;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    UsersRepository repository;

    @GetMapping(path="/allUsers")
    @ResponseBody
    Iterable<User> allUsers() {
        return repository.findAll();
    }

    @GetMapping(path="/getUser/{id}")
    User getUser(@PathVariable int id) {
        return repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PostMapping(path="/addUser")
    String addUser (
            @RequestBody User user
    ) {
        repository.save(user);
        return "User saved: " + user;
    }
}
