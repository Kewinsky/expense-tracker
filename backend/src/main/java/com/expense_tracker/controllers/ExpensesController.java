package com.expense_tracker.controllers;

import com.expense_tracker.DTOs.ExpenseDTO;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.models.Expense;
import com.expense_tracker.repositories.ExpenseRepository;
import com.expense_tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
@PreAuthorize("hasRole('USER')")
public class ExpensesController {

    @Autowired
    ExpenseRepository expensesRepository;

    @Autowired
    ExpenseService expenseService;

    @Autowired
    UserController userController;

    @GetMapping(path = "/getExpensesByUser/{id}")
    @ResponseBody
    List<ExpenseDTO> getExpensesByUser(@PathVariable Long id) {
        return expenseService.getExpensesWithCategory(id);
    }

    @PostMapping(path = "/addExpense")
    String addExpense(@RequestBody Expense expense) {
        userController.getUserById(expense.getUserId());
        expensesRepository.save(expense);
        return "Expense added successfully";
    }

    @PutMapping("updateExpense/{id}")
    String updateExpense(@RequestBody Expense expense,
                         @PathVariable Long id) {
        return expensesRepository.findById(id)
                .map(exp -> {
                    exp.setTitle(expense.getTitle());
                    exp.setValue(expense.getValue());
                    exp.setCategoryId(expense.getCategoryId());
                    exp.setDate(expense.getDate());
                    expensesRepository.save(exp);
                    return "Expense updated successfully";
                })
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @DeleteMapping("/deleteExpense/{id}")
    String deleteExpense(@PathVariable Long id) {
        if (!expensesRepository.existsById(id)) {
            throw new ExpenseNotFoundException(id);
        }
        expensesRepository.deleteById(id);
        return "Expense deleted successfully";
    }
}
