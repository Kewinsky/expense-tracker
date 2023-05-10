package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.notes.NoteNotFoundException;
import com.expense_tracker.models.Expense;
import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.models.Note;
import com.expense_tracker.repositories.ExpensesRepository;
import com.expense_tracker.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
@PreAuthorize("hasRole('USER')")
public class ExpensesController {

    @Autowired
    ExpensesRepository expensesRepository;

    @Autowired
    NotesRepository notesRepository;

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

    @GetMapping(path="/getNoteByUser/{id}")
    @ResponseBody Iterable<Note> getNoteByUser(@PathVariable Long id) {
        return notesRepository.findByUserId(id);
    }

    @PostMapping(path="/addExpense")
    String addExpense (@RequestBody Expense expense) {
        userController.getUserById(expense.getUserId());
        expensesRepository.save(expense);
        return "Expense saved.";
    }

    @PostMapping(path="/addNote")
    String addNote (@RequestBody Note note) {
        userController.getUserById(note.getUserId());
        if(notesRepository.findByUserId(note.getUserId()).toString() == "[]"){
            notesRepository.save(note);
            return "Note saved.";
        }
        return "Already created.";
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

    @PutMapping("updateNote/{id}")
    String updateNote(@RequestBody Note note,
                         @PathVariable Long id){
        return notesRepository.findById(id)
                .map(nt -> {
                    nt.setContent(note.getContent());
                    notesRepository.save(nt);
                    return "Note updated.";
                })
                .orElseThrow(() -> new NoteNotFoundException(id));
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
