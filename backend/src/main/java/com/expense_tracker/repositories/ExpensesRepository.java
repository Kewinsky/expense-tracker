package com.expense_tracker.repositories;

import com.expense_tracker.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpensesRepository extends JpaRepository<Expense, Long> {

    Iterable<Expense> findByUserId(Long userId);

}