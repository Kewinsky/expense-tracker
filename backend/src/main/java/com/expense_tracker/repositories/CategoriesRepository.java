package com.expense_tracker.repositories;

import com.expense_tracker.entities.Category;
import com.expense_tracker.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, Integer> {

}