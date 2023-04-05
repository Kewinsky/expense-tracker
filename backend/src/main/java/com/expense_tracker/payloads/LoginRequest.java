package com.expense_tracker.payloads;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
