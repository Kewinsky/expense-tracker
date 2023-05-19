package com.expense_tracker.controllers;

import com.expense_tracker.exceptions.expenses.ExpenseNotFoundException;
import com.expense_tracker.exceptions.notes.NoteNotFoundException;
import com.expense_tracker.models.Expense;
import com.expense_tracker.models.Note;
import com.expense_tracker.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin
@PreAuthorize("hasRole('USER')")
public class NotesController {
    @Autowired
    NotesRepository notesRepository;

    @Autowired
    UserController userController;

    @GetMapping(path = "/getNotesByUser/{id}")
    @ResponseBody
    Iterable<Note> getNotesByUser(@PathVariable Long id) {
        return notesRepository.findByUserId(id);
    }

    @PutMapping("updateNote/{id}")
    String updateNote(@RequestBody Note note,
                      @PathVariable String id) {
        if(!Objects.equals(id, "undefined")){
        return notesRepository.findById(Long.parseLong(id))
                .map(nt -> {
                    nt.setNote(note.getNote());
                    notesRepository.save(nt);
                    return "Note updated.";
                })
                .orElseThrow(() -> new NoteNotFoundException(Long.parseLong(id)));
        }
        notesRepository.save(note);
        return "Note added.";
    }
}