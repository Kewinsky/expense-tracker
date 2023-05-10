package com.expense_tracker.exceptions.notes;

public class NoteNotFoundException extends RuntimeException{
    public NoteNotFoundException(Long id) {
        super("Could not find note with id: " + id);
    }
}
