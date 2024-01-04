package com.expense_tracker.services;

import com.expense_tracker.exceptions.incomes.IncomeNotFoundException;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.Income;
import com.expense_tracker.repositories.IncomeRepository;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Income> getIncomes(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return incomeRepository.findByUserIdOrderByDate(userId);
    }

    public void addIncomes(Income income) {
        var userId = income.getUser().getId();

        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        incomeRepository.save(income);
    }

    public String updateIncome(Long incomeId, Income updateIncome) {
        return incomeRepository.findById(incomeId)
                .map(inc -> {
                    inc.setDate(updateIncome.getDate());
                    inc.setTitle(updateIncome.getTitle());
                    inc.setValue(updateIncome.getValue());
                    incomeRepository.save(inc);
                    return "Income updated successfully";
                })
                .orElseThrow(() -> new IncomeNotFoundException(incomeId));
    }

    public void deleteIncome(Long incomeId) {
        if (!incomeRepository.existsById(incomeId)) {
            throw new IncomeNotFoundException(incomeId);
        }
        incomeRepository.deleteById(incomeId);
    }
}
