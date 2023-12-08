package com.expense_tracker.controllers;

import com.expense_tracker.models.Expense;
import com.expense_tracker.payloads.responses.ExpenseResponse;
import com.expense_tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
@PreAuthorize("hasRole('USER')")
public class ExpenseController {
    @Autowired
    ExpenseService expenseService;

    @GetMapping("/getExpensesByUser/{id}")
    @ResponseBody
    ResponseEntity<List<ExpenseResponse>> getExpensesByUser(@PathVariable Long id) {
        var result = expenseService.getExpensesWithCategory(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/addExpense")
    ResponseEntity<String> addExpense(@RequestBody Expense expense) {
        expenseService.addExpense(expense);

        return ResponseEntity.ok("Expense added successfully");
    }

    @PutMapping("updateExpense/{id}")
    ResponseEntity<String> updateExpense(@RequestBody Expense expense,
                                         @PathVariable Long id) {
        var result = expenseService.updateExpense(id, expense);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteExpense/{id}")
    ResponseEntity<String> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);

        return ResponseEntity.ok("Expense deleted successfully");
    }
}
