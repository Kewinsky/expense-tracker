package com.expense_tracker.payloads.requests;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
