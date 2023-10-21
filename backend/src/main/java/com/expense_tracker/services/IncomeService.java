package com.expense_tracker.services;

import com.expense_tracker.exceptions.incomes.IncomeNotFoundByMonthException;
import com.expense_tracker.models.Income;
import com.expense_tracker.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;

@Service
public class IncomeService {

    @Autowired
    IncomeRepository incomeRepository;

    public Income getIncomeByUserAndMonth(Long userId, int year, Month month) {
        var startDate = LocalDate.of(year, month, 1);
        var endDate = startDate.plusMonths(1).minusDays(1);
        
        var income = incomeRepository.findByUserIdAndDateBetween(userId, startDate, endDate);

        if (income == null) {
            throw new IncomeNotFoundByMonthException(year, month);
        }

        return income;
    }
}
