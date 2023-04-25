package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.models.User;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
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

    @PreAuthorize("hasRole('USER')")
    @PutMapping("updateUser/{id}")
    String updateUser(@RequestBody User user,
                         @PathVariable Long id){
        return userRepository.findById(id)
                .map(user1 -> {
                    user1.setUsername(user.getUsername());
                    user1.setEmail(user.getEmail());
                    user1.setPassword(user.getPassword());
                    userRepository.save(user1);
                    return "User updated.";
                })
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @PutMapping("updateUserByAdmin/{id}")
    String updateUserByAdmin(@RequestBody User user,
                      @PathVariable Long id){
        return userRepository.findById(id)
                .map(user1 -> {
                    user1.setUsername(user.getUsername());
                    user1.setEmail(user.getEmail());
                    user1.setRoles(user.getRoles());
                    userRepository.save(user1);
                    return "User updated.";
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/deleteUser/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id: " + id + " has been removed.";
    }


}
