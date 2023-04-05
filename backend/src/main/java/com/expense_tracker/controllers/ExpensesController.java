package com.expense_tracker.controllers;

import com.expense_tracker.entities.Expense;
import com.expense_tracker.entities.User;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.repositories.CategoriesRepository;
import com.expense_tracker.repositories.ExpensesRepository;
import com.expense_tracker.repositories.UserRepository;
import com.expense_tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpensesController {

    @Autowired
    ExpensesRepository expensesRepository;

    @Autowired
    CategoryController categoryController;

    @Autowired
    UserController userController;

    @GetMapping(path="/getExpenses")
    @ResponseBody Iterable<Expense> getExpenses() {
        return expensesRepository.findAll();
    }

    @GetMapping(path="/getExpense/{id}")
    Expense getExpense(@PathVariable int id) {
        return expensesRepository.findById(id)
                .orElseThrow(() -> new ExpenseNotFoundException(id));
    }

    @GetMapping(path="/getExpensesByUser/{id}")
    @ResponseBody Iterable<Expense> getExpensesByUser(@PathVariable int id) {
        return expensesRepository.findByUserId(id);
    }

    @PostMapping(path="/addExpense")
    String addExpense (@RequestBody Expense expense) {
        categoryController.getCategoryById(expense.getCategoryId());
        userController.getUserById(expense.getUserId());
        expensesRepository.save(expense);
        return "Expense saved. (" + expense.getId() + " " + expense.getTitle() + ")";
    }

    @PutMapping("updateExpense/{id}")
    String updateExpense(@RequestBody Expense expense,
                          @PathVariable int id){
        categoryController.getCategoryById(expense.getCategoryId());
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
    String deleteExpense(@PathVariable int id) {
        if (!expensesRepository.existsById(id)){
            throw new ExpenseNotFoundException(id);
        }
        expensesRepository.deleteById(id);
        return "Expense with id: " + id + " has been removed.";
    }
}
