package com.expense_tracker.payloads.responses;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseResponse {
    private Long id;
    private String title;
    private float value;
    private String category;
    private LocalDate date;
    private Long userId;
}
