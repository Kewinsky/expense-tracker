package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.User;
import com.expense_tracker.payloads.requests.ForgotPasswordRequest;
import com.expense_tracker.payloads.requests.LoginRequest;
import com.expense_tracker.payloads.requests.SignupRequest;
import com.expense_tracker.payloads.responses.JwtResponse;
import com.expense_tracker.payloads.responses.MessageResponse;
import com.expense_tracker.repositories.UserRepository;
import com.expense_tracker.security.jwt.JwtUtils;
import com.expense_tracker.security.services.UserDetailsImpl;
import com.expense_tracker.utils.CategoryProvider;
import com.expense_tracker.utils.RoleConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    CategoryProvider categoryProvider;

    @Autowired
    private RoleConverter converter;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(
                    new JwtResponse(
                            jwt,
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles)
            );
        } catch (AuthenticationException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Invalid username or password!"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email is already in use!"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        // Set roles for new User
        var strRoles = signUpRequest.getRole();
        user.setRoles(converter.toRoleSet(strRoles));

        userRepository.save(user);

        // Set predefined categories for new User
        categoryProvider.addPredefinedCategoriesToUser(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

    @PutMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        if (!userRepository.existsByEmail(forgotPasswordRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email not found!"));
        }

        return userRepository.findByEmail(forgotPasswordRequest.getEmail())
                .map(user -> {
                    user.setPassword(encoder.encode(forgotPasswordRequest.getPassword()));
                    userRepository.save(user);
                    return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
                })
                .orElseThrow(() -> new UserNotFoundException(forgotPasswordRequest.getEmail()));
    }
}
