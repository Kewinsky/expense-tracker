package com.expense_tracker.controllers;

import com.expense_tracker.models.Expense;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.repositories.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpensesController {

    @Autowired
    ExpensesRepository expensesRepository;

    @Autowired
    UserController userController;

    @GetMapping(path="/getExpenses")
    @ResponseBody Iterable<Expense> getExpenses() {
        return expensesRepository.findAll();
    }

    @GetMapping(path="/getExpense/{id}")
    Expense getExpense(@PathVariable Long id) {
        return expensesRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @GetMapping(path="/getExpensesByUser/{id}")
    @ResponseBody Iterable<Expense> getExpensesByUser(@PathVariable Long id) {
        return expensesRepository.findByUserId(id);
    }

    @PostMapping(path="/addExpense")
    String addExpense (@RequestBody Expense expense) {
        userController.getUserById(expense.getUserId());
        expensesRepository.save(expense);
        return "Expense saved. (" + expense.getId() + " " + expense.getTitle() + ")";
    }

    @PutMapping("updateExpense/{id}")
    String updateExpense(@RequestBody Expense expense,
                          @PathVariable Long id){
        return expensesRepository.findById(id)
                .map(exp -> {
                    exp.setTitle(expense.getTitle());
                    exp.setValue(expense.getValue());
                    exp.setCategoryId(expense.getCategoryId());
                    exp.setDate(expense.getDate());
                    expensesRepository.save(exp);
                    return "Expense saved. (" + exp.getId() + " " + exp.getTitle() + ")";
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
