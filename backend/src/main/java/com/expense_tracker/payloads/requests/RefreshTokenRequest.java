package com.expense_tracker.payloads.requests;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String refreshToken;
}
