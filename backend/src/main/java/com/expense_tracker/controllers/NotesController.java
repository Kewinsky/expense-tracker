package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.exceptions.notes.NoteNotFoundException;
import com.expense_tracker.models.Expense;
import com.expense_tracker.models.Note;
import com.expense_tracker.repositories.ExpensesRepository;
import com.expense_tracker.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
//@PreAuthorize("hasRole('USER')")
public class NotesController {
    @Autowired
    NotesRepository notesRepository;

    @Autowired
    UserController userController;

    @GetMapping(path = "/getNoteByUser/{id}")
    @ResponseBody
    Iterable<Note> getNotesByUser(@PathVariable Long id) {
        return notesRepository.findByUserId(id);
    }

    @PostMapping(path = "/addNote")
    String addNote(@RequestBody Note note) {
        userController.getUserById(note.getUserId());
        if(!notesRepository.existsByMonthAndUserId(note.getMonth(), note.getUserId())){
            notesRepository.save(note);
            return "Note saved.";
        }
        return "Already created.";
    }

    @PutMapping("updateNote/{id}")
    String updateNote(@RequestBody Note note,
                      @PathVariable Long id) {
        return notesRepository.findById(id)
                .map(nt -> {
                    nt.setNote(note.getNote());
                    notesRepository.save(nt);
                    return "Note updated.";
                })
                .orElseThrow(() -> new NoteNotFoundException(id));
    }
}