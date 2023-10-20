package com.expense_tracker.repositories;

import com.expense_tracker.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserIdOrderByDate(Long userId);

    @Modifying
    @Query("DELETE FROM Expense e WHERE e.userId = :userId")
    void deleteAllByUserId(@Param("userId") Long userId);

    List<Expense> findByCategoryId(Long categoryId);
}