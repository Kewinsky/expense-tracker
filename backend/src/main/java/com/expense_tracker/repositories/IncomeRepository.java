package com.expense_tracker.repositories;

import com.expense_tracker.models.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUserIdOrderByDate(Long userId);

    Income findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
}