package com.expense_tracker.controllers;

import com.expense_tracker.models.Income;
import com.expense_tracker.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/incomes")
@PreAuthorize("hasRole('USER')")
public class IncomeController {
    @Autowired
    IncomeService incomeService;

    @GetMapping("/getIncomesByUser/{id}")
    @ResponseBody
    ResponseEntity<List<Income>> getIncomesByUser(@PathVariable Long id) {
        var result = incomeService.getIncomes(id);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/addIncome")
    ResponseEntity<String> addIncome(@RequestBody Income income) {
        incomeService.addIncomes(income);

        return ResponseEntity.ok("Income added successfully");
    }

    @PutMapping("updateIncome/{id}")
    ResponseEntity<String> updateIncome(@RequestBody Income income,
                                        @PathVariable Long id) {
        var result = incomeService.updateIncome(id, income);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteIncome/{id}")
    ResponseEntity<String> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);

        return ResponseEntity.ok("Income deleted successfully");
    }
}
