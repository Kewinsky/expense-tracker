package com.expense_tracker.repositories;

import com.expense_tracker.models.Category;
import com.expense_tracker.models.enums.ECategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(ECategory name);

}