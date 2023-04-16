package com.expense_tracker.models;

import com.expense_tracker.models.enums.ECategory;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ECategory name;

    public Category(ECategory name) {
        this.name = name;
    }
}