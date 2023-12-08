package com.expense_tracker.controllers;

import com.expense_tracker.models.User;
import com.expense_tracker.payloads.requests.SignupRequest;
import com.expense_tracker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers() {
        var result = userService.getUsers();

        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("updateProfile/{id}")
    ResponseEntity<String> updateProfile(@RequestBody User user,
                                         @PathVariable Long id) {

        var result = userService.updateProfile(id, user);

        return ResponseEntity.ok(result);
    }

    @PutMapping("updateUser/{id}")
    ResponseEntity<String> updateUser(@RequestBody SignupRequest user,
                                      @PathVariable Long id) {
        var result = userService.updateUser(id, user);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteUser/{id}")
    ResponseEntity<String> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}
