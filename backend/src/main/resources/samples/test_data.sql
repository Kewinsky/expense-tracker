#create initial roles
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

#create initial user
INSERT INTO users (email, password, username) VALUES ("admin@gmail.com", "$2a$10$6E72jUTcv/iGlTM9kJAXm.W/hUjI128bCQltvSzW3a3ZiHPUsVz6C", "Admin");

#provide all roles for admin
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (1, 3);

#provide predefined categories for admin
INSERT INTO categories (title, user_id) VALUES ("Food", 1);
INSERT INTO categories (title, user_id) VALUES ("Transport", 1);
INSERT INTO categories (title, user_id) VALUES ("Utilities", 1);
INSERT INTO categories (title, user_id) VALUES ("Personal", 1);
INSERT INTO categories (title, user_id) VALUES ("Housing", 1);
INSERT INTO categories (title, user_id) VALUES ("Medical", 1);
INSERT INTO categories (title, user_id) VALUES ("Entertainment", 1);
INSERT INTO categories (title, user_id) VALUES ("Gifts", 1);

#provide income examples for admin
INSERT INTO incomes(date, title, user_id, value)
VALUES
    ("2024-01-01", "Salary", 1, 3000),
    ("2024-02-01", "Salary", 1, 3000),
    ("2024-03-01", "Salary", 1, 3000),
    ("2024-04-01", "Salary", 1, 3000),
    ("2024-05-01", "Salary", 1, 3000),
    ("2024-06-01", "Salary", 1, 3000),
    ("2024-07-01", "Salary", 1, 3000),
    ("2024-08-01", "Salary", 1, 3000),
    ("2024-09-01", "Salary", 1, 3000),
    ("2024-10-01", "Salary", 1, 3000),
    ("2024-11-01", "Salary", 1, 3000),
    ("2024-12-01", "Salary", 1, 3000);

#provide expense examples for admin
INSERT INTO expenses(category_id, date, title, user_id, value)
VALUES
    (2, "2024-01-02", "Gas", 1, 30),
    (1, "2024-01-05", "Takeout", 1, 50),
    (2, "2024-01-10", "Train Ticket", 1, 15),
    (1, "2024-01-15", "Groceries", 1, 200),
    (3, "2024-01-15", "Rent", 1, 350),
    (3, "2024-01-15", "Water Bill", 1, 100),
    (3, "2024-01-15", "Electricity Bill", 1, 160),
    (3, "2024-01-15", "Gas Bill", 1, 300),
    (3, "2024-01-15", "Spotify Subscription", 1, 5),
    (3, "2024-01-15", "Internet Subscription", 1, 60),
    (6, "2024-01-20", "Doctor visit", 1, 50),
    (4, "2024-01-20", "Massage", 1, 75),
    (7, "2024-01-25", "Movie tickets", 1, 25),
    (8, "2024-01-31", "Investment", 1, 500),

    (1, "2024-02-02", "Dinner out", 1, 50),
    (2, "2024-02-05", "Uber ride", 1, 20),
    (6, "2024-02-10", "Prescription Medication", 1, 50),
    (7, "2024-02-14", "Valentine's Day Dinner", 1, 100),
    (3, "2024-02-15", "Rent", 1, 350),
    (3, "2024-02-15", "Water Bill", 1, 150),
    (3, "2024-02-15", "Electricity Bill", 1, 150),
    (3, "2024-02-15", "Gas Bill", 1, 290),
    (3, "2024-02-15", "Spotify Subscription", 1, 5),
    (3, "2024-02-15", "Internet Subscription", 1, 60),
    (1, "2024-02-20", "Coffee", 1, 5),
    (6, "2024-02-25", "Prescription", 1, 15),
    (8, "2024-02-28", "IRA Contribution", 1, 500),
    (7, "2024-02-28", "Concert tickets", 1, 100),

    (1, "2024-03-03", "Groceries", 1, 100),
    (8, "2024-03-03", "Savings account", 1, 1000),
    (2, "2024-03-07", "Uber Ride", 1, 25),
    (1, "2024-03-07", "Lunch", 1, 10),
    (2, "2024-03-10", "Parking ticket", 1, 25),
    (3, "2024-03-15", "Rent", 1, 350),
    (3, "2024-03-15", "Water Bill", 1, 150),
    (3, "2024-03-15", "Electricity Bill", 1, 150),
    (3, "2024-03-15", "Gas Bill", 1, 290),
    (3, "2024-03-15", "Spotify Subscription", 1, 5),
    (3, "2024-03-15", "Internet Subscription", 1, 60),
    (5, "2024-03-20", "Home insurance", 1, 200),
    (4, "2024-03-20", "Haircut", 1, 30),
    (1, "2024-03-25", "Snacks", 1, 15),
    (5, "2024-03-31", "Mortgage", 1, 1200),
    (6, "2024-03-31", "Dentist visit", 1, 75),

    (7, "2024-04-02", "Amusement park tickets", 1, 80),
    (8, "2024-04-05", "Retirement fund", 1, 500),
    (1, "2024-04-10", "Dinner", 1, 75),
    (6, "2024-04-10", "Eye Exam", 1, 100),
    (2, "2024-04-15", "Train tickets", 1, 100),
    (7, "2024-04-15", "Amusement Park Tickets", 1, 150),
    (3, "2024-04-15", "Rent", 1, 350),
    (3, "2024-04-15", "Water Bill", 1, 135),
    (3, "2024-04-15", "Electricity Bill", 1, 140),
    (3, "2024-04-15", "Gas Bill", 1, 265),
    (3, "2024-04-15", "Spotify Subscription", 1, 5),
    (3, "2024-04-15", "Internet Subscription", 1, 60),
    (5, "2024-04-25", "Home repairs", 1, 250),
    (8, "2024-04-30", "401k Contribution", 1, 600),
    (1, "2024-04-30", "Takeout", 1, 40),

    (1, "2024-05-01", "Groceries", 1, 80),
    (1, "2024-05-03", "Pizza", 1, 100),
    (2, "2024-05-15", "Gasoline", 1, 50),
    (3, "2024-05-15", "Rent", 1, 350),
    (3, "2024-05-15", "Water Bill", 1, 100),
    (3, "2024-05-15", "Electricity Bill", 1, 150),
    (3, "2024-05-15", "Gas Bill", 1, 240),
    (3, "2024-05-15", "Spotify Subscription", 1, 5),
    (3, "2024-05-15", "Internet Subscription", 1, 60),
    (2, "2024-05-20", "Gasoline", 1, 50),
    (6, "2024-05-20", "Doctor visit", 1, 150),
    (6, "2024-05-25", "Doctor's Appointment", 1, 200),
    (4, "2024-05-25", "Haircut", 1, 30),
    (8, "2024-05-28", "Savings deposit", 1, 500),
    (7, "2024-05-28", "Movie Tickets", 1, 30),
    (7, "2024-05-31", "Concert ticket", 1, 100),
    (8, "2024-05-31", "Savings", 1, 500),

    (1, "2024-06-02", "Restaurant", 1, 60),
    (1, "2024-06-03", "Groceries", 1, 150),
    (4, "2024-06-15", "Haircut", 1, 40),
    (2, "2024-06-15", "Bus ticket", 1, 10),
    (3, "2024-06-15", "Rent", 1, 350),
    (3, "2024-06-15", "Water Bill", 1, 130),
    (3, "2024-06-15", "Electricity Bill", 1, 200),
    (3, "2024-06-15", "Gas Bill", 1, 200),
    (3, "2024-06-15", "Spotify Subscription", 1, 5),
    (3, "2024-06-15", "Internet Subscription", 1, 60),
    (6, "2024-06-20", "Pharmacy", 1, 50),
    (2, "2024-06-20", "Train Ticket", 1, 20),
    (6, "2024-06-25", "Prescription", 1, 50),
    (4, "2024-06-25", "Manicure", 1, 20),
    (8, "2024-06-28", "Savings deposit", 1, 500),
    (7, "2024-06-28", "Concert Tickets", 1, 100),
    (7, "2024-06-30", "Movie ticket", 1, 20),
    (8, "2024-06-30", "Savings", 1, 500),

    (1, "2024-07-03", "Restaurant", 1, 200),
    (1, "2024-07-03", "Groceries", 1, 100),
    (2, "2024-07-15", "Uber ride", 1, 30),
    (3, "2024-07-15", "Rent", 1, 350),
    (3, "2024-07-15", "Water Bill", 1, 130),
    (3, "2024-07-15", "Electricity Bill", 1, 150),
    (3, "2024-07-15", "Gas Bill", 1, 100),
    (3, "2024-07-15", "Spotify Subscription", 1, 5),
    (3, "2024-07-15", "Internet Subscription", 1, 60),
    (6, "2024-07-20", "Dentist visit", 1, 200),
    (2, "2024-07-20", "Gas", 1, 45),
    (6, "2024-07-25", "Dental Checkup", 1, 150),
    (4, "2024-07-25", "Perfume", 1, 50),
    (8, "2024-07-28", "Savings deposit", 1, 500),
    (7, "2024-07-28", "Movie Tickets", 1, 30),
    (7, "2024-07-31", "Sports event ticket", 1, 150),
    (8, "2024-07-31", "Savings", 1, 500),

    (1, "2024-08-01", "Groceries", 1, 80),
    (1, "2024-08-03", "Groceries", 1, 150),
    (3, "2024-08-15", "Rent", 1, 350),
    (3, "2024-08-15", "Water Bill", 1, 100),
    (3, "2024-08-15", "Electricity Bill", 1, 140),
    (3, "2024-08-15", "Gas Bill", 1, 80),
    (3, "2024-08-15", "Spotify Subscription", 1, 5),
    (3, "2024-08-15", "Internet Subscription", 1, 60),
    (4, "2024-08-15", "Nail Salon", 1, 50),
    (2, "2024-08-15", "Gasoline", 1, 50),
    (2, "2024-08-20", "Car Wash", 1, 15),
    (6, "2024-08-20", "Doctor visit", 1, 150),
    (4, "2024-08-25", "Haircut", 1, 30),
    (6, "2024-08-25", "Prescription", 1, 50),
    (7, "2024-08-28", "Theme Park Tickets", 1, 150),
    (8, "2024-08-31", "Savings", 1, 500),

    (1, "2024-09-01", "Groceries", 1, 150),
    (2, "2024-09-05", "Gasoline", 1, 50),
    (3, "2024-09-15", "Rent", 1, 350),
    (3, "2024-09-15", "Water Bill", 1, 90),
    (3, "2024-09-15", "Electricity Bill", 1, 150),
    (3, "2024-09-15", "Gas Bill", 1, 100),
    (3, "2024-09-15", "Spotify Subscription", 1, 5),
    (3, "2024-09-15", "Internet Subscription", 1, 60),
    (4, "2024-09-15", "Haircut", 1, 30),
    (4, "2024-09-20", "Haircut", 1, 30),
    (6, "2024-09-25", "Doctor's Visit", 1, 200),
    (7, "2024-09-30", "Movie Tickets", 1, 50),
    (8, "2024-09-30", "401k Contribution", 1, 500),

    (1, "2024-10-01", "Eating Out", 1, 75),
    (2, "2024-10-05", "Train Ticket", 1, 20),
    (6, "2024-10-10", "Doctor's Appointment", 1, 200),
    (7, "2024-10-15", "Movie Tickets", 1, 50),
    (3, "2024-10-15", "Rent", 1, 350),
    (3, "2024-10-15", "Water Bill", 1, 100),
    (3, "2024-10-15", "Electricity Bill", 1, 130),
    (3, "2024-10-15", "Gas Bill", 1, 130),
    (3, "2024-10-15", "Spotify Subscription", 1, 5),
    (3, "2024-10-15", "Internet Subscription", 1, 60),
    (4, "2024-10-15", "Gym Membership", 1, 80),
    (5, "2024-10-20", "Home Insurance", 1, 150),
    (6, "2024-10-25", "Prescription", 1, 30),
    (7, "2024-10-30", "Concert Tickets", 1, 200),
    (8, "2024-10-30", "Savings Account", 1, 500),
    (8, "2024-10-31", "401k Contribution", 1, 500),

    (1, "2024-11-01", "Groceries", 1, 100),
    (1, "2024-11-03", "Dinner Date", 1, 100),
    (2, "2024-11-05", "Gas", 1, 50),
    (2, "2024-11-05", "Uber Ride", 1, 20),
    (4, "2024-11-15", "Massage", 1, 75),
    (3, "2024-11-15", "Rent", 1, 350),
    (3, "2024-11-15", "Water Bill", 1, 110),
    (3, "2024-11-15", "Electricity Bill", 1, 120),
    (3, "2024-11-15", "Gas Bill", 1, 150),
    (3, "2024-11-15", "Spotify Subscription", 1, 5),
    (3, "2024-11-15", "Internet Subscription", 1, 60),
    (4, "2024-11-20", "Manicure", 1, 25),
    (6, "2024-11-25", "Dentist Visit", 1, 150),
    (7, "2024-11-30", "Netflix Subscription", 1, 15),
    (8, "2024-11-30", "IRA Contribution", 1, 1000),

    (1, "2024-12-01", "Holiday Dinner", 1, 200),
    (2, "2024-12-05", "Uber Ride", 1, 25),
    (6, "2024-12-10", "Dentist Appointment", 1, 150),
    (3, "2024-12-15", "Rent", 1, 350),
    (3, "2024-12-15", "Water Bill", 1, 110),
    (3, "2024-12-15", "Electricity Bill", 1, 120),
    (3, "2024-12-15", "Gas Bill", 1, 250),
    (3, "2024-12-15", "Spotify Subscription", 1, 5),
    (3, "2024-12-15", "Internet Subscription", 1, 60),
    (4, "2024-12-15", "Manicure", 1, 25),
    (7, "2024-12-15", "Concert Tickets", 1, 100),
    (5, "2024-12-20", "Property Tax", 1, 300),
    (6, "2024-12-25", "Emergency Room Visit", 1, 1000),
    (8, "2024-12-31", "IRA Contribution", 1, 600);

INSERT INTO notes(month, note, user_id, year)
VALUES
    (0, "January was a challenging month for us. Unexpected home repairs, including a burst pipe and a malfunctioning heating system, drained our budget significantly. We were caught off guard by these expenses and realized the importance of having an emergency fund in place. Moving forward, we plan to allocate a portion of our income to build up our emergency savings for unforeseen circumstances. Additionally, we'll review our insurance coverage to ensure we're adequately protected in case of future home-related issues.", 1, 2024),
    (1, "February brought some relief as we successfully adhered to our budget and reduced unnecessary expenses. We managed to increase our savings and are proud of our progress in managing our finances. This month's success has motivated us to continue being mindful of our spending habits and stay on track with our financial goals. We are also exploring investment opportunities to make our money work for us in the long term.", 1, 2024),
    (2, "In March, we celebrated our fifth anniversary with a lovely dinner at our favorite restaurant. It was a special and memorable month for us. While the anniversary celebration was a significant expense, we view it as an investment in our relationship. We also began discussing our future financial plans, including saving for a down payment on a house and starting a family. This month marked the beginning of important conversations about our long-term financial goals.", 1, 2024),
    (3, "April was marked by the start of a new project at work, which required additional expenses for transportation and some work-related supplies. To manage these costs, we decided to carpool with a colleague, which not only saved us money but also reduced our carbon footprint. We are exploring ways to make our daily commutes more cost-effective and environmentally friendly. In addition, we reviewed our monthly subscriptions and canceled a few that we no longer found valuable, contributing to cost savings.", 1, 2024),
    (4, "May was a delightful vacation month for us. We traveled to the mountains for a week-long getaway. While the trip was a bit expensive, it was worth every penny. We cherished the quality time spent together, enjoyed outdoor activities, and felt recharged upon returning home. It reinforced the importance of setting aside funds for special experiences and travel. We are now considering a dedicated vacation savings fund to make future trips even more enjoyable and stress-free.", 1, 2024),
    (5, "June was all about gardening and home improvements. We invested in our house, planting a beautiful garden, and making various upgrades that have made our home more comfortable and energy-efficient. We learned about the importance of maintaining our property and the long-term benefits of energy-efficient improvements. We are excited to see the positive impact on our utility bills and overall home value. This month's activities have sparked our interest in home improvement projects that align with our budget and financial goals.", 1, 2024),
    (6, "July was marked by hot weather, resulting in higher utility bills due to increased use of air conditioning. To mitigate these costs, we researched and implemented energy-saving strategies, such as sealing drafts and upgrading insulation. This not only helped reduce our energy bills but also contributed to a more comfortable living environment. As the summer continued, we remained conscious of our energy consumption and found ways to save both energy and money. We are committed to practicing sustainability and reducing our ecological footprint.", 1, 2024),
    (7, "August was a relatively quiet month with no significant expenses. We continued to save for future plans and reviewed our financial goals. It provided us with an opportunity to assess our progress and make necessary adjustments to our budget and investment strategies. We are considering diversifying our investments to further secure our financial future and achieve our long-term goals, such as retirement and education funds for our children.", 1, 2024),
    (8, "In September, we encountered back-to-school expenses for our children. This included purchasing school supplies, clothing, and textbooks. We realized the importance of budgeting for these expenses in advance to ensure a smooth transition into the school year. We explored ways to cut costs by taking advantage of sales and discounts while maintaining the quality of our children's education. September was a reminder of the financial responsibilities that come with parenthood and the need for careful planning.", 1, 2024),
    (9, "October was marked by Halloween preparations, and we had a great time decorating the house and planning costumes with our kids. While it was a fun and creative month, it also came with added expenses for costumes and decorations. We found joy in these experiences, which reaffirmed our belief in the value of creating special moments for our family. Looking forward, we are thinking of ways to incorporate holiday-related expenses into our annual budget to ensure financial stability during festive seasons.", 1, 2024),
    (10, "November marked the beginning of holiday shopping, and we initiated discussions about our holiday budget. We are committed to making thoughtful and budget-conscious gift choices for our loved ones while avoiding overspending. As we approached the holiday season, we began to outline a detailed financial plan to navigate through the expenses related to gifts, decorations, and celebrations. This proactive approach aims to maintain financial discipline during this festive time.", 1, 2024),
    (11, "December was a festive month with numerous holiday celebrations and gatherings with friends and family. While it was filled with joy and merriment, it also entailed increased spending on gifts, food, and decorations. To ensure that we remained financially responsible during this period, we stuck to our holiday budget and refrained from impulsive purchases. As the year came to a close, we reflected on our financial journey and resolved to set new goals and budgeting strategies for the upcoming year to continue our path to financial security.", 1, 2024);
