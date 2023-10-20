package com.expense_tracker.repositories;

import com.expense_tracker.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotesRepository extends JpaRepository<Note, Long> {

    Iterable<Note> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Note n WHERE n.userId = :userId")
    void deleteAllByUserId(@Param("userId") Long userId);

}