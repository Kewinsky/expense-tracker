package com.expense_tracker.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api")
public class ExpensesController {

    @GetMapping(path="/getMessage")
    public @ResponseBody String getMessage() {
        return "Working!";
    }
}
