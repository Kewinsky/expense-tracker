package com.expense_tracker.exceptions.notes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NoteNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(NoteNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String noteNotFoundHandler(NoteNotFoundException ex) {
        return ex.getMessage();
    }
}
