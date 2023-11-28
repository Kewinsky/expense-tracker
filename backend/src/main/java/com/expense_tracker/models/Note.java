package com.expense_tracker.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int year;

    private int month;

    @Column(length = 1000)
    private String note;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
