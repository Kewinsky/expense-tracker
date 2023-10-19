package com.expense_tracker.DTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ExpenseDTO {
    private Long id;

    private String title;

    private float value;

    private String category;

    private LocalDate date;

    private Long userId;
}
