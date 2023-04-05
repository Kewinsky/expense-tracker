package com.expense_tracker.security;

import com.expense_tracker.entities.User;
import com.expense_tracker.exceptions.ResourceNotFoundException;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByEmail(email);

        return userOptional
                .orElseThrow(() ->
                        new UsernameNotFoundException("Invalid credentials."));
    }
}