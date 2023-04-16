package com.expense_tracker.models;

import com.expense_tracker.models.enums.ECategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String title;

    private float value;

    @Enumerated(EnumType.STRING)
    private ECategory category;

    private String date;

    private Long userId;
}
