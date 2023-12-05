package com.expense_tracker.payloads.requests;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String email;
    private String password;
}
