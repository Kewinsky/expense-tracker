package com.expense_tracker.utils;

import java.util.HashSet;
import java.util.Set;

public class CategoryProvider {
    public static Set<String> getPredefinedCategories() {
        Set<String> predefinedCategories = new HashSet<>();

        predefinedCategories.add("Food");
        predefinedCategories.add("Transport");
        predefinedCategories.add("Utilities");
        predefinedCategories.add("Personal");
        predefinedCategories.add("Housing");
        predefinedCategories.add("Medical");
        predefinedCategories.add("Entertainment");
        predefinedCategories.add("Savings");

        return predefinedCategories;
    }
}
