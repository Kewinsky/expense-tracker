package com.expense_tracker.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private float value;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
