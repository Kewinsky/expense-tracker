package com.expense_tracker.services;

import com.expense_tracker.exceptions.notes.NoteNotFoundException;
import com.expense_tracker.exceptions.users.UserNotFoundException;
import com.expense_tracker.models.Note;
import com.expense_tracker.repositories.NoteRepository;
import com.expense_tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;


    public List<Note> getNotes(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return noteRepository.findByUserId(userId);
    }

    public String updateNote(String noteId, Note updateNote) {
        if (!Objects.equals(noteId, "undefined")) {
            return noteRepository.findById(Long.parseLong(noteId))
                    .map(nt -> {
                        nt.setNote(updateNote.getNote());
                        noteRepository.save(nt);
                        return "Note updated successfully";
                    })
                    .orElseThrow(() -> new NoteNotFoundException(Long.parseLong(noteId)));
        }

        noteRepository.save(updateNote);

        return "Note added successfully";
    }
}
