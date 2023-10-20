package com.expense_tracker.repositories;

import com.expense_tracker.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Category c WHERE c.userId = :userId")
    void deleteAllByUserId(@Param("userId") Long userId);
}
