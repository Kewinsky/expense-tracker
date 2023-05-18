USE spendee;

--create initial roles
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

--create initial admin user
INSERT INTO users (email, password, username) VALUES ("admin@gmail.com", "$2a$10$6E72jUTcv/iGlTM9kJAXm.W/hUjI128bCQltvSzW3a3ZiHPUsVz6C", "Admin");

--provide all roles for admin
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 3);

--provide test data
INSERT INTO expenses(category, date, title, user_id, value)
VALUES
    ("TRANSPORT", "2023-01-02", "Gas", 1, 30),
    ("FOOD", "2023-01-05", "Takeout", 1, 50),
    ("TRANSPORT", "2023-01-10", "Train Ticket", 1, 15),
    ("FOOD", "2023-01-15", "Groceries", 1, 200),
    ("UTILITIES", "2023-01-15", "Rent", 1, 350),
    ("UTILITIES", "2023-01-15", "Water Bill", 1, 100),
    ("UTILITIES", "2023-01-15", "Electricity Bill", 1, 160),
    ("UTILITIES", "2023-01-15", "Gas Bill", 1, 300),
    ("UTILITIES", "2023-01-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-01-15", "Internet Subscribtion", 1, 60),
    ("MEDICAL", "2023-01-20", "Doctor visit", 1, 50),
    ("PERSONAL", "2023-01-20", "Massage", 1, 75),
    ("ENTERTAINMENT", "2023-01-25", "Movie tickets", 1, 25),
    ("SAVINGS", "2023-01-31", "Investment", 1, 500),


    ("FOOD", "2023-02-02", "Dinner out", 1, 50),
    ("TRANSPORT", "2023-02-05", "Uber ride", 1, 20),
    ("MEDICAL", "2023-02-10", "Prescription Medication", 1, 50),
    ("ENTERTAINMENT", "2023-02-14", "Valentine's Day Dinner", 1, 100),
    ("UTILITIES", "2023-02-15", "Rent", 1, 350),
    ("UTILITIES", "2023-02-15", "Water Bill", 1, 150),
    ("UTILITIES", "2023-02-15", "Electricity Bill", 1, 150),
    ("UTILITIES", "2023-02-15", "Gas Bill", 1, 290),
    ("UTILITIES", "2023-02-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-02-15", "Internet Subscribtion", 1, 60),
    ("FOOD", "2023-02-20", "Coffee", 1, 5),
    ("MEDICAL", "2023-02-25", "Prescription", 1, 15),
    ("SAVINGS", "2023-02-28", "IRA Contribution", 1, 500),
    ("ENTERTAINMENT", "2023-02-28", "Concert tickets", 1, 100),


    ("FOOD", "2023-03-03", "Groceries", 1, 100),
    ("SAVINGS", "2023-03-03", "Savings account", 1, 1000),
    ("TRANSPORT", "2023-03-07", "Uber Ride", 1, 25),
    ("FOOD", "2023-03-07", "Lunch", 1, 10),
    ("TRANSPORT", "2023-03-10", "Parking ticket", 1, 25),
    ("UTILITIES", "2023-03-15", "Rent", 1, 350),
    ("UTILITIES", "2023-03-15", "Water Bill", 1, 150),
    ("UTILITIES", "2023-03-15", "Electricity Bill", 1, 150),
    ("UTILITIES", "2023-03-15", "Gas Bill", 1, 290),
    ("UTILITIES", "2023-03-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-03-15", "Internet Subscribtion", 1, 60),
    ("HOUSING", "2023-03-20", "Home insurance", 1, 200),
    ("PERSONAL", "2023-03-20", "Haircut", 1, 30),
    ("FOOD", "2023-03-25", "Snacks", 1, 15),
    ("HOUSING", "2023-03-31", "Mortgage", 1, 1200),
    ("MEDICAL", "2023-03-31", "Dentist visit", 1, 75),


    ("ENTERTAINMENT", "2023-04-02", "Amusement park tickets", 1, 80),
    ("SAVINGS", "2023-04-05", "Retirement fund", 1, 500),
    ("FOOD", "2023-04-10", "Dinner", 1, 75),
    ("MEDICAL", "2023-04-10", "Eye Exam", 1, 100),
    ("TRANSPORT", "2023-04-15", "Train tickets", 1, 100),
    ("ENTERTAINMENT", "2023-04-15", "Amusement Park Tickets", 1, 150),
    ("UTILITIES", "2023-04-15", "Rent", 1, 350),
    ("UTILITIES", "2023-04-15", "Water Bill", 1, 135),
    ("UTILITIES", "2023-04-15", "Electricity Bill", 1, 140),
    ("UTILITIES", "2023-04-15", "Gas Bill", 1, 265),
    ("UTILITIES", "2023-04-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-04-15", "Internet Subscribtion", 1, 60),
    ("HOUSING", "2023-04-25", "Home repairs", 1, 250),
    ("SAVINGS", "2023-04-30", "401k Contribution", 1, 600),
    ("FOOD", "2023-04-30", "Takeout", 1, 40),


    ("FOOD", "2023-05-01", "Groceries", 1, 80),
    ("FOOD", "2023-05-03", "Pizza", 1, 100),
    ("TRANSPORT", "2023-05-15", "Gasoline", 1, 50),
    ("UTILITIES", "2023-05-15", "Rent", 1, 350),
    ("UTILITIES", "2023-05-15", "Water Bill", 1, 100),
    ("UTILITIES", "2023-05-15", "Electricity Bill", 1, 150),
    ("UTILITIES", "2023-05-15", "Gas Bill", 1, 240),
    ("UTILITIES", "2023-05-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-05-15", "Internet Subscribtion", 1, 60),
    ("TRANSPORT", "2023-05-20", "Gas", 1, 50),
    ("MEDICAL", "2023-05-20", "Doctor visit", 1, 150),
    ("MEDICAL", "2023-05-25", "Doctor's Appointment", 1, 200),
    ("PERSONAL", "2023-05-25", "Haircut", 1, 30),
    ("SAVINGS", "2023-05-28", "Savings deposit", 1, 500),
    ("ENTERTAINMENT", "2023-05-28", "Movie Tickets", 1, 30),
    ("ENTERTAINMENT", "2023-05-31", "Concert ticket", 1, 100),
    ("SAVINGS", "2023-05-31", "Savings", 1, 500),


    ("FOOD", "2023-06-02", "Restaurant", 1, 60),
    ("FOOD", "2023-06-03", "Groceries", 1, 150),
    ("PERSONAL", "2023-06-15", "Haircut", 1, 40),
    ("TRANSPORT", "2023-06-15", "Bus ticket", 1, 10),
    ("UTILITIES", "2023-06-15", "Rent", 1, 350),
    ("UTILITIES", "2023-06-15", "Water Bill", 1, 130),
    ("UTILITIES", "2023-06-15", "Electricity Bill", 1, 200),
    ("UTILITIES", "2023-06-15", "Gas Bill", 1, 200),
    ("UTILITIES", "2023-06-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-06-15", "Internet Subscribtion", 1, 60),
    ("MEDICAL", "2023-06-20", "Pharmacy", 1, 50),
    ("TRANSPORT", "2023-06-20", "Train Ticket", 1, 20),
    ("MEDICAL", "2023-06-25", "Prescription", 1, 50),
    ("PERSONAL", "2023-06-25", "Manicure", 1, 20),
    ("SAVINGS", "2023-06-28", "Savings deposit", 1, 500),
    ("ENTERTAINMENT", "2023-06-28", "Concert Tickets", 1, 100),
    ("ENTERTAINMENT", "2023-06-30", "Movie ticket", 1, 20),
    ("SAVINGS", "2023-06-30", "Savings", 1, 500),


    ("FOOD", "2023-07-03", "Restaurant", 1, 200),
    ("FOOD", "2023-07-03", "Groceries", 1, 100),
    ("TRANSPORT", "2023-07-15", "Uber ride", 1, 30),
    ("UTILITIES", "2023-07-15", "Rent", 1, 350),
    ("UTILITIES", "2023-07-15", "Water Bill", 1, 130),
    ("UTILITIES", "2023-07-15", "Electricity Bill", 1, 150),
    ("UTILITIES", "2023-07-15", "Gas Bill", 1, 100),
    ("UTILITIES", "2023-07-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-07-15", "Internet Subscribtion", 1, 60),
    ("MEDICAL", "2023-07-20", "Dentist visit", 1, 200),
    ("TRANSPORT", "2023-07-20", "Gas", 1, 45),
    ("MEDICAL", "2023-07-25", "Dental Checkup", 1, 150),
    ("PERSONAL", "2023-07-25", "Perfume", 1, 50),
    ("SAVINGS", "2023-07-28", "Savings deposit", 1, 500),
    ("ENTERTAINMENT", "2023-07-28", "Movie Tickets", 1, 30),
    ("ENTERTAINMENT", "2023-07-31", "Sports event ticket", 1, 150),
    ("SAVINGS", "2023-07-31", "Savings", 1, 500),


    ("FOOD", "2023-08-01", "Groceries", 1, 80),
    ("FOOD", "2023-08-03", "Groceries", 1, 150),
    ("UTILITIES", "2023-08-15", "Rent", 1, 350),
    ("UTILITIES", "2023-08-15", "Water Bill", 1, 100),
    ("UTILITIES", "2023-08-15", "Electricity Bill", 1, 140),
    ("UTILITIES", "2023-08-15", "Gas Bill", 1, 80),
    ("UTILITIES", "2023-08-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-08-15", "Internet Subscribtion", 1, 60),
    ("PERSONAL", "2023-08-15", "Nail Salon", 1, 50),
    ("TRANSPORT", "2023-08-15", "Gasoline", 1, 50),
    ("TRANSPORT", "2023-08-20", "Car Wash", 1, 15),
    ("MEDICAL", "2023-08-20", "Doctor visit", 1, 150),
    ("PERSONAL", "2023-08-25", "Haircut", 1, 30),
    ("MEDICAL", "2023-08-25", "Prescription", 1, 50),
    ("ENTERTAINMENT", "2023-08-28", "Theme Park Tickets", 1, 150),
    ("SAVINGS", "2023-08-31", "Savings", 1, 500),


    ("FOOD", "2023-09-01", "Groceries", 1, 150),
    ("TRANSPORT", "2023-09-05", "Gasoline", 1, 50),
    ("UTILITIES", "2023-09-15", "Rent", 1, 350),
    ("UTILITIES", "2023-09-15", "Water Bill", 1, 90),
    ("UTILITIES", "2023-09-15", "Electricity Bill", 1, 150),
    ("UTILITIES", "2023-09-15", "Gas Bill", 1, 100),
    ("UTILITIES", "2023-09-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-09-15", "Internet Subscribtion", 1, 60),
    ("PERSONAL", "2023-09-15", "Haircut", 1, 30),
    ("PERSONAL", "2023-09-20", "Haircut", 1, 30),
    ("MEDICAL", "2023-09-25", "Doctor's Visit", 1, 200),
    ("ENTERTAINMENT", "2023-09-30", "Movie Tickets", 1, 50),
    ("SAVINGS", "2023-09-30", "401k Contribution", 1, 500),


    ("FOOD", "2023-10-01", "Eating Out", 1, 75),
    ("TRANSPORT", "2023-10-05", "Train Ticket", 1, 20),
    ("MEDICAL", "2023-10-10", "Doctor's Appointment", 1, 200),
    ("ENTERTAINMENT", "2023-10-15", "Movie Tickets", 1, 50),
    ("UTILITIES", "2023-10-15", "Rent", 1, 350),
    ("UTILITIES", "2023-10-15", "Water Bill", 1, 100),
    ("UTILITIES", "2023-10-15", "Electricity Bill", 1, 130),
    ("UTILITIES", "2023-10-15", "Gas Bill", 1, 130),
    ("UTILITIES", "2023-10-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-10-15", "Internet Subscribtion", 1, 60),
    ("PERSONAL", "2023-10-15", "Gym Membership", 1, 80),
    ("HOUSING", "2023-10-20", "Home Insurance", 1, 150),
    ("MEDICAL", "2023-10-25", "Prescription", 1, 30),
    ("ENTERTAINMENT", "2023-10-30", "Concert Tickets", 1, 200),
    ("SAVINGS", "2023-10-30", "Savings Account", 1, 500),
    ("SAVINGS", "2023-10-31", "401k Contribution", 1, 500),


    ("FOOD", "2023-11-01", "Groceries", 1, 100),
    ("FOOD", "2023-11-03", "Dinner Date", 1, 100),
    ("TRANSPORT", "2023-11-05", "Gas", 1, 50),
    ("TRANSPORT", "2023-11-05", "Uber Ride", 1, 20),
    ("PERSONAL", "2023-11-15", "Massage", 1, 75),
    ("UTILITIES", "2023-11-15", "Rent", 1, 350),
    ("UTILITIES", "2023-11-15", "Water Bill", 1, 110),
    ("UTILITIES", "2023-11-15", "Electricity Bill", 1, 120),
    ("UTILITIES", "2023-11-15", "Gas Bill", 1, 150),
    ("UTILITIES", "2023-11-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-11-15", "Internet Subscribtion", 1, 60),
    ("PERSONAL", "2023-11-20", "Manicure", 1, 25),
    ("MEDICAL", "2023-11-25", "Dentist Visit", 1, 150),
    ("ENTERTAINMENT", "2023-11-30", "Netflix Subscription", 1, 15),
    ("SAVINGS", "2023-11-30", "IRA Contribution", 1, 1000),


    ("FOOD", "2023-12-01", "Holiday Dinner", 1, 200),
    ("TRANSPORT", "2023-12-05", "Uber Ride", 1, 25),
    ("MEDICAL", "2023-12-10", "Dentist Appointment", 1, 150),
    ("UTILITIES", "2023-12-15", "Rent", 1, 350),
    ("UTILITIES", "2023-12-15", "Water Bill", 1, 110),
    ("UTILITIES", "2023-12-15", "Electricity Bill", 1, 120),
    ("UTILITIES", "2023-12-15", "Gas Bill", 1, 250),
    ("UTILITIES", "2023-12-15", "Spotify Subscribtion", 1, 5),
    ("UTILITIES", "2023-12-15", "Internet Subscribtion", 1, 60),
    ("PERSONAL", "2023-12-15", "Manicure", 1, 25),
    ("ENTERTAINMENT", "2023-12-15", "Concert Tickets", 1, 100),
    ("HOUSING", "2023-12-20", "Property Tax", 1, 300),
    ("SAVINGS", "2023-12-31", "IRA Contribution", 1, 600),
    ("MEDICAL", "2023-12-25", "Emergency Room Visit", 1, 1000);
