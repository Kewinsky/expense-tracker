package com.expense_tracker.security.passwordValidator;

import lombok.Getter;

@Getter
public class ValidationResult {
    private final boolean isValid;
    private final String message;

    private ValidationResult(boolean isValid, String message) {
        this.isValid = isValid;
        this.message = message;
    }

    public static ValidationResult valid() {
        return new ValidationResult(true, null);
    }

    public static ValidationResult invalid(String message) {
        return new ValidationResult(false, message);
    }

    public boolean isValid() {
        return isValid;
    }
}