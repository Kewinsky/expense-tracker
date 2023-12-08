package com.expense_tracker.controllers;

import com.expense_tracker.models.Note;
import com.expense_tracker.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/notes")
@PreAuthorize("hasRole('USER')")
public class NoteController {
    @Autowired
    NoteService noteService;

    @GetMapping("/getNotesByUser/{id}")
    @ResponseBody
    ResponseEntity<List<Note>> getNotesByUser(@PathVariable Long id) {
        var result = noteService.getNotes(id);

        return ResponseEntity.ok(result);
    }

    @PutMapping("updateNote/{id}")
    ResponseEntity<String> updateNote(@RequestBody Note note,
                                      @PathVariable Long id) {
        var result = noteService.updateNote(id, note);

        return ResponseEntity.ok(result);
    }
}