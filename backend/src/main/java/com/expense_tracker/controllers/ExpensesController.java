package com.expense_tracker.controllers;

import com.expense_tracker.entities.Expense;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.repositories.ExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/expenses")
@CrossOrigin
public class ExpensesController {

    @Autowired
    ExpensesRepository repository;

    @GetMapping(path="/allExpenses")
    @ResponseBody Iterable<Expense> allExpenses() {
        return repository.findAll();
    }

    @GetMapping(path="/getExpense/{id}")
    Expense getExpense(@PathVariable int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @PostMapping(path="/addExpense")
    String addExpense (
            @RequestBody Expense expense
    ) {
        repository.save(expense);
        return "Expense saved. (" + expense.getId() + " " + expense.getTitle() + ")";
    }

    @PostMapping("updateExpense/{id}")
    String updateExpense(@RequestBody Expense expense,
                          @PathVariable int id){
        return repository.findById(id)
                .map(exp -> {
                    exp.setTitle(expense.getTitle());
                    exp.setValue(expense.getValue());
                    exp.setCategory(expense.getCategory());
                    exp.setDate(expense.getDate());
                    repository.save(exp);
                    return "Expense saved. (" + exp.getId() + " " + exp.getTitle() + ")";
                })
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @DeleteMapping("/deleteExpense/{id}")
    String deleteExpense(@PathVariable int id) {
        if (!repository.existsById(id)){
            throw new ExpenseNotFoundException(id);
        }
        repository.deleteById(id);
        return "Expense with id: " + id + " has been removed.";
    }
}
