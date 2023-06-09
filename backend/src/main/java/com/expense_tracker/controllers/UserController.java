package com.expense_tracker.controllers;

import com.expense_tracker.models.User;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.payloads.requests.SignupRequest;
import com.expense_tracker.repositories.UserRepository;
import com.expense_tracker.utils.RoleConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleConverter converter;

    @GetMapping("/getUsers")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
    @GetMapping(path="/getUserById/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR')")
    @PutMapping("updateUser/{id}")
    String updateUser(@RequestBody User user,
                         @PathVariable Long id){

        return userRepository.findById(id)
                .map(user1 -> {
                    user1.setUsername(user.getUsername());
                    user1.setEmail(user.getEmail());
                    userRepository.save(user1);
                    return "User updated successfully";
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("updateUserByAdmin/{id}")
    String updateUserByAdmin(@RequestBody SignupRequest user,
                      @PathVariable Long id){
        return userRepository.findById(id)
                .map(user1 -> {
                    user1.setUsername(user.getUsername());
                    user1.setEmail(user.getEmail());
                    user1.setRoles(converter.toRoleSet(user.getRole()));
                    userRepository.save(user1);
                    return "User updated successfully";
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/deleteUser/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User deleted successfully";
    }


}
