package com.expense_tracker.repositories;

import com.expense_tracker.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserIdOrderByDate(Long userId);

    List<Expense> findByCategoryId(Long categoryId);
}