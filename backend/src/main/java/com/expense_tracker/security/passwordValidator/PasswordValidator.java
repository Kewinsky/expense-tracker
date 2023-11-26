package com.expense_tracker.security.passwordValidator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PasswordValidator {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{10,}$";
    private static final String LENGTH_MESSAGE = "10 characters";
    private static final String DIGIT_MESSAGE = "1 digit";
    private static final String LOWERCASE_MESSAGE = "1 lowercase letter";
    private static final String UPPERCASE_MESSAGE = "1 uppercase letter";
    private static final String SPECIAL_CHAR_MESSAGE = "1 special character (@#$%^&+=!)";

    @Autowired
    PasswordEncoder passwordEncoder;

    public ValidationResult validate(String password) {
        if (!password.matches(PASSWORD_PATTERN)) {
            StringBuilder errorMessage = new StringBuilder("Password must contain at least:\n");
            if (password.length() < 10) {
                errorMessage.append("- ").append(LENGTH_MESSAGE).append("\n");
            }
            if (!password.matches(".*\\d.*")) {
                errorMessage.append("- ").append(DIGIT_MESSAGE).append("\n");
            }
            if (!password.matches(".*[a-z].*")) {
                errorMessage.append("- ").append(LOWERCASE_MESSAGE).append("\n");
            }
            if (!password.matches(".*[A-Z].*")) {
                errorMessage.append("- ").append(UPPERCASE_MESSAGE).append("\n");
            }
            if (!password.matches(".*[@#$%^&+=!].*")) {
                errorMessage.append("- ").append(SPECIAL_CHAR_MESSAGE).append("\n");
            }
            return ValidationResult.invalid(errorMessage.toString());
        }

        return ValidationResult.valid();
    }
}
