# Spendee | expense_tracker
Spendee is an application, developed with Java, React, and MySQL, empowers users to effectively monitor and manage their financial activities. With a user-friendly interface, the application allows users to easily input and categorize their expenses, track spending trends, and generate insightful reports. By leveraging the power of Java, React, and MySQL, this application provides a reliable and efficient solution for maintaining a clear overview of personal or business expenses.

## Getting started
1. Configure your local database:
   - create new schema `CREATE SCHEMA 'spendee'` 
   - set up credentials in [resources file](https://github.com/Kewinsky/expense-tracker/blob/main/backend/src/main/resources/application.properties)
   
   example:
   - `spring.datasource.url=jdbc:mysql://localhost:3306/spendee`
   - `spring.datasource.username=root`
   - `spring.datasource.password=root`
   
2. Insert test data using code from [here](https://github.com/Kewinsky/expense-tracker/blob/main/backend/src/main/java/com/expense_tracker/helpers/test_data.sql)

3. Go to /frontend folder and run `npm install` in terminal to install dependencies.
4. Type `npm start` to run it.
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Stack:
### Backend: 
- Java
- Spring Boot
- Hibernate
- Swagger
- JSON Web Token

### Frontend:
- React
- React Bootstrap
- Sass
- Axios
- Chart.js

### Database:
- MySQL
