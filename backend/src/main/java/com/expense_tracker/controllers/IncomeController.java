package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.incomes.IncomeNotFoundException;
import com.expense_tracker.models.Income;
import com.expense_tracker.repositories.IncomeRepository;
import com.expense_tracker.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/incomes")
@PreAuthorize("hasRole('USER')")
public class IncomeController {

    @Autowired
    IncomeRepository incomeRepository;

    @Autowired
    IncomeService incomeService;

    @Autowired
    UserController userController;

    @GetMapping("/getIncomesByUser/{id}")
    @ResponseBody
    List<Income> getIncomesByUser(@PathVariable Long id) {
        userController.getUserById(id);

        return incomeRepository.findByUserIdOrderByDate(id);
    }

    @GetMapping("/getIncomeByUserAndMonth")
    @ResponseBody
    Income getIncomeByUserAndMonth(@RequestParam Long userId, @RequestParam int year, @RequestParam Month month) {
        return incomeService.getIncomeByUserAndMonth(userId, year, month);
    }

    @PostMapping("/addIncome")
    String addIncome(@RequestBody Income income) {
        userController.getUserById(income.getUserId());
        incomeRepository.save(income);

        return "Income added successfully";
    }

    @PutMapping("updateIncome/{id}")
    String updateIncome(@RequestBody Income income,
                        @PathVariable Long id) {
        return incomeRepository.findById(id)
                .map(inc -> {
                    inc.setDate(income.getDate());
                    inc.setValue(income.getValue());
                    incomeRepository.save(inc);
                    return "Income updated successfully";
                })
                .orElseThrow(() -> new IncomeNotFoundException(id));
    }

    @DeleteMapping("/deleteIncome/{id}")
    String deleteIncome(@PathVariable Long id) {
        if (!incomeRepository.existsById(id)) {
            throw new IncomeNotFoundException(id);
        }
        incomeRepository.deleteById(id);

        return "Income deleted successfully";
    }
}
