package com.expense_tracker.repositories;

import com.expense_tracker.models.Expense;
import com.expense_tracker.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepository extends JpaRepository<Note, Long> {

    Iterable<Note> findByUserId(Long userId);

}