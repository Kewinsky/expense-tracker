package com.expense_tracker.payloads;

import com.expense_tracker.entities.Category;
import lombok.Data;


@Data
public class ExpenseResponse {
    private int id;
    private String title;
    private float value;
    private Category category;
    private String date;
    private UserSummary createdBy;
}
