package com.expense_tracker.controllers;

import com.expense_tracker.models.Expense;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.repositories.ExpensesRepository;
import com.expense_tracker.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
@PreAuthorize("hasRole('USER')")
public class ExpensesController {

    @Autowired
    ExpensesRepository expensesRepository;

    @Autowired
    UserController userController;
    
    @GetMapping(path="/getExpensesByUser/{id}")
    @ResponseBody Iterable<Expense> getExpensesByUser(@PathVariable Long id) {
        userController.getUserById(id);
        return expensesRepository.findByUserId(id);
    }

    @PostMapping(path="/addExpense")
    String addExpense (@RequestBody Expense expense) {
        userController.getUserById(expense.getUserId());
        expensesRepository.save(expense);
        return "Expense saved.";
    }

    @PutMapping("updateExpense/{id}")
    String updateExpense(@RequestBody Expense expense,
                          @PathVariable Long id){
        return expensesRepository.findById(id)
                .map(exp -> {
                    exp.setTitle(expense.getTitle());
                    exp.setValue(expense.getValue());
                    exp.setCategory(expense.getCategory());
                    exp.setDate(expense.getDate());
                    expensesRepository.save(exp);
                    return "Expense updated.";
                })
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @DeleteMapping("/deleteExpense/{id}")
    String deleteExpense(@PathVariable Long id) {
        if (!expensesRepository.existsById(id)){
            throw new ExpenseNotFoundException(id);
        }
        expensesRepository.deleteById(id);
        return "Expense with id: " + id + " has been removed.";
    }
}
