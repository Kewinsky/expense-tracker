# Spendee | expenses_tracker
Spendee is an application, developed with Java, React, and MySQL, empowers users to effectively monitor and manage their financial activities. With a user-friendly interface, the application allows users to easily input and categorize their expenses, track spending trends, and generate insightful reports. By leveraging the power of Java, React, and MySQL, this application provides a reliable and efficient solution for maintaining a clear overview of personal or business expenses.

## Features
The application includes the following features:
- User authentication and authorization
- CRUD operations (Create, Read, Update, Delete) for managing data
- Server-side validation of user inputs
- Database persistence using MySQL
- RESTful API endpoints for communication between the front-end and back-end
- Interactive user interface built with React

## Technologies Used:
- Java Spring Boot: A Java-based framework for building robust and scalable web applications.
- React: A JavaScript library for building user interfaces.
- MySQL: A relational database management system.
- HTML/CSS: Used for structuring and styling the user interface.

## Deployment
The application is deployed using the following AWS services:
- Amazon RDS: The MySQL database is hosted on Amazon RDS for data storage.
- Amazon EC2: The Java Spring Boot backend is deployed on an Amazon EC2 instance.
- Amazon S3: The React frontend is hosted on an Amazon S3 bucket for static web hosting.

## Prerequisites
To run the application locally, you need to have the following installed:
- Java Development Kit (JDK) version 8 or higher
- Node.js and npm (Node Package Manager)
- MySQL Server

## Installation
To install and run the application, follow these steps:
1. Clone the repository to your local machine.
```
git clone https://github.com/your-username/your-repo.git
```

2. Set up the database.
Create a new MySQL database and note down the database name, username, and password.

Open the [`application.properties`](https://github.com/Kewinsky/expense-tracker/blob/main/backend/src/main/resources/application.properties) file in the Spring Boot project and update the following properties with your database credentials:
```
spring.datasource.url=jdbc:mysql://localhost:3306/your-database-name
spring.datasource.username=your-username
spring.datasource.password=your-password
```

3. Insert test data using code from [here](https://github.com/Kewinsky/expense-tracker/blob/main/backend/src/main/java/com/expense_tracker/helpers/test_data.sql)

4. Install the necessary dependencies.
- Navigate to the backend project directory.
```
cd backend
```
- Install the required dependencies using Maven.
```
mvn install
```
- Navigate to the frontend project directory.
```
cd ../frontend
```
- Install the required dependencies using npm.
```
npm install
```

5. Build and run the application.
- Build the Spring Boot application.
```
mvn clean install
```
- Start the Spring Boot server.
```
mvn spring-boot:run
```
- In a separate terminal, start the React development server.
```
npm start
```

6. Access the application.
Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view and interact with the application.

## Directory Structure
The repository is organized as follows:
- backend: Contains the Java Spring Boot application.
- frontend: Contains the React front-end application.

