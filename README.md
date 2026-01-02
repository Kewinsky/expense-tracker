# Spendee | Expense Tracker

## Overview

Spendee is a full-stack personal finance management application that enables users to track expenses, manage income, categorize transactions, and analyze spending patterns through interactive visualizations. The application provides a comprehensive solution for individuals seeking to maintain clear oversight of their financial activities.

- **Problem it solves**: Helps users monitor spending habits, track income vs. expenses, identify spending trends by category and time period, and maintain organized financial records with visual analytics.
- **Who it is for**: Individuals and small businesses looking for a personal finance tracking solution with data visualization and reporting capabilities.

## Key Features

- **User Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (USER, MODERATOR, ADMIN)
  - User registration and login
  - Password reset functionality
  - Protected routes and API endpoints

- **Financial Transaction Management**

  - Create, read, update, and delete expenses
  - Create, read, update, and delete income records
  - Category management with custom categories
  - Transaction filtering by month and year
  - Date-based transaction tracking

- **Dashboard & Analytics**

  - Interactive dashboard with financial summaries
  - Bar charts for category-wise expense breakdown
  - Line charts for monthly/yearly expense trends
  - Utilities tracking (Electricity, Gas, Water) with dedicated charts
  - Income vs. expense comparisons
  - Month-over-month and year-over-year comparisons
  - Total outcome visualizations

- **User Experience**

  - Dark mode support with theme persistence
  - Responsive design with Bootstrap
  - Toast notifications for user feedback
  - Month/year navigation and filtering
  - Notes functionality for monthly annotations
  - User profile management
  - Settings page

- **Administrative Features**
  - User management (for ADMIN/MODERATOR roles)
  - User profile updates
  - Predefined category assignment for new users

## Tech Stack

### Frontend

- **React** 18.2.0 - UI library
- **React Router DOM** 6.9.0 - Client-side routing
- **Chart.js** 4.3.0 & **React-ChartJS-2** 5.2.0 - Data visualization
- **React Bootstrap** 2.7.2 & **Bootstrap** 5.2.3 - UI components and styling
- **Axios** 1.3.4 - HTTP client for API communication
- **SASS** 1.59.3 - CSS preprocessing
- **React Toastify** 9.1.2 - Toast notifications
- **React Select** 5.7.3 - Select components
- **React Icons** 4.8.0 - Icon library

### Backend

- **Java** 19 - Programming language
- **Spring Boot** 2.6.6 - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database abstraction layer
- **Hibernate** - ORM framework
- **JWT (jjwt)** 0.9.1 - JSON Web Token implementation
- **Lombok** 1.18.26 - Code generation
- **Springfox Swagger** 3.0.0 - API documentation
- **Spring Validation** - Input validation
- **Maven** - Build and dependency management

### Database

- **MySQL** - Relational database management system
- **Hibernate DDL Auto** - Schema management

### Infrastructure / Cloud

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MySQL Docker Image** - Database containerization

### Tooling & DevOps

- **Maven** - Java build tool
- **npm** - Node.js package manager
- **Docker** - Containerization for local deployment
- **Swagger UI** - API documentation and testing

### Mobile (In Development)

- **React Native** 0.73.2 - Mobile framework
- **Expo** ~50.0.2 - React Native development platform

## Architecture & Design

### High-Level Architecture

The application follows a three-tier architecture:

- **Frontend Layer**: React SPA communicating with REST API via Axios
- **Backend Layer**: Spring Boot REST API with JWT authentication
- **Database Layer**: MySQL for persistent data storage

### Design Decisions

- **JWT Authentication**: Stateless authentication using JWT tokens stored client-side, enabling scalable session management
- **Role-Based Access Control**: Three-tier role system (USER, MODERATOR, ADMIN) with method-level security annotations
- **RESTful API Design**: Standardized REST endpoints following REST principles
- **Service Layer Pattern**: Business logic separated into service classes, controllers handle HTTP concerns
- **Repository Pattern**: Data access abstracted through Spring Data JPA repositories
- **Exception Handling**: Custom exception classes with global exception handlers for consistent error responses
- **CORS Configuration**: Cross-origin resource sharing configured for frontend-backend communication
- **Theme Context**: React Context API for global theme state management

### Data Flow

1. User authenticates via `/api/auth/signin`, receives JWT token
2. Frontend stores JWT in localStorage and includes it in Authorization header for subsequent requests
3. Backend validates JWT via `AuthTokenFilter` on each request
4. Authorized requests access protected endpoints based on user roles
5. Data flows: Frontend → Axios → Spring Controllers → Services → Repositories → MySQL
6. Responses return JSON data to frontend for rendering

## Project Structure

```
expense-tracker/
├── backend/                    # Spring Boot backend application
│   ├── src/main/java/com/expense_tracker/
│   │   ├── config/            # Security, Swagger, WebMVC configurations
│   │   ├── controllers/      # REST API controllers
│   │   ├── exceptions/       # Custom exception classes and handlers
│   │   ├── models/           # JPA entity models (User, Expense, Income, Category, Note)
│   │   ├── payloads/         # Request/response DTOs
│   │   ├── repositories/     # Spring Data JPA repositories
│   │   ├── security/         # JWT, password validation, user details
│   │   ├── services/         # Business logic layer
│   │   └── utils/            # Utility classes
│   ├── src/main/resources/
│   │   ├── application.properties  # Application configuration
│   │   └── samples/          # Sample SQL data
│   └── Dockerfile            # Backend container definition
│
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components (charts, forms, modals, etc.)
│   │   ├── pages/           # Page components (dashboard, expenses, incomes, etc.)
│   │   ├── services/        # API service layer (Axios calls)
│   │   ├── routes/          # Route definitions and protected route wrapper
│   │   ├── layouts/         # Layout components
│   │   ├── helpers/         # Utility functions (filtering, summing, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # Global styles and themes
│   │   └── utils/           # Utility data and functions
│   └── Dockerfile           # Frontend container definition
│
├── mobile/                   # React Native mobile app (in development)
│   └── App.js               # Mobile app entry point
│
└── docker-compose.yml        # Multi-container orchestration configuration
```

## Setup & Local Development

### Prerequisites

- **Java Development Kit (JDK)** 19 or higher
- **Node.js** and **npm** (Node Package Manager)
- **MySQL Server** (or use Docker Compose)
- **Docker** and **Docker Compose** (for containerized deployment)
- **Maven** 3.6+ (or use included Maven wrapper)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Backend Setup**

   ```bash
   cd backend
   mvn clean install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

````

4. **Database Configuration**
   * Update `backend/src/main/resources/application.properties` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
   * Create the MySQL database: `expense_tracker`
   * (Optional) Insert test data from `backend/src/main/resources/samples/test_data.sql`

### Environment Variables (Docker Compose)

For Docker Compose deployment, create a `.env` file in the root directory with:
```env
MYSQLDB_ROOT_PASSWORD=your_root_password
MYSQLDB_DATABASE=expense_tracker
MYSQLDB_USER=your_username
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306
SPRING_LOCAL_PORT=8080
SPRING_DOCKER_PORT=8080
REACT_LOCAL_PORT=3000
REACT_DOCKER_PORT=3000
````

### Running the Project Locally

**Option 1: Traditional Development (Separate Services)**

1. **Start MySQL database** (if not using Docker)

   ```bash
   # Ensure MySQL is running on localhost:3306
   ```

2. **Start Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

````
   Backend will run on `http://localhost:8080`

3. **Start Frontend** (in a separate terminal)
   ```bash
   cd frontend
npm start
````

Frontend will run on `http://localhost:3000`

**Option 2: Docker Compose (Recommended for Raspberry Pi)**

1. **Create `.env` file** in the root directory with required environment variables (see above)

2. **Start all services**

   ```bash
   docker-compose up
   ```

3. **Stop all services**

   ```bash
   docker-compose down
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000` (or configured `REACT_LOCAL_PORT`)
   - Backend API: `http://localhost:8080` (or configured `SPRING_LOCAL_PORT`)
   - Swagger UI: `http://localhost:8080/swagger-ui/`

### Default Test Credentials

- Username: `admin`
- Password: `admin`

## Deployment

### Deployment Approach

The application supports containerized deployment using Docker Compose, which is particularly useful for local deployment on devices like Raspberry Pi.

**Docker Compose Deployment:**

- All services (MySQL, Backend, Frontend) are containerized
- Services are orchestrated via `docker-compose.yml`
- Environment variables are managed through `.env` file
- Database volume is persisted for data retention
- Services automatically restart on failure (backend) or unless stopped (database)

**Production Deployment (from codebase evidence):**

- Backend deployed on **Amazon EC2** instance
- Frontend hosted on **Amazon S3** for static web hosting
- Database hosted on **Amazon RDS** (MySQL)

### Hosting / Cloud Services Used

- **Amazon EC2** - Backend hosting
- **Amazon S3** - Frontend static hosting
- **Amazon RDS** - MySQL database hosting
- **Docker** - Containerization for local/edge deployment

## Security & Best Practices

### Authentication / Authorization Approach

- **JWT-Based Authentication**: Stateless authentication using JSON Web Tokens
  - Tokens generated on successful login with 1-hour expiration (configurable)
  - Tokens stored client-side and sent in `Authorization: Bearer <token>` header
  - Token validation on every request via `AuthTokenFilter`
- **Role-Based Access Control (RBAC)**:
  - Three roles: `ROLE_USER`, `ROLE_MODERATOR`, `ROLE_ADMIN`
  - Method-level security using `@PreAuthorize` annotations
  - User endpoints restricted to ADMIN/MODERATOR roles
  - Profile updates allowed for all authenticated users
- **Password Security**:
  - BCrypt password encoding
  - Custom password validator with strength requirements
  - Password reset functionality with email verification

### Data Validation and Error Handling

- **Server-Side Validation**:
  - Spring Validation annotations (`@Valid`, `@NotNull`, etc.)
  - Custom validation for password strength
  - Input sanitization and type checking
- **Exception Handling**:
  - Custom exception classes for each entity (UserNotFoundException, ExpenseNotFoundException, etc.)
  - Global exception handlers with `@ControllerAdvice`
  - Consistent error response format
  - Proper HTTP status codes (400, 404, 500, etc.)

### Security-Related Practices Visible in Code

- **CORS Configuration**: Configured for allowed origins (configurable via `app.cors.allowedOrigins`)
- **CSRF Disabled**: Appropriate for stateless JWT authentication
- **Session Management**: Stateless sessions (`SessionCreationPolicy.STATELESS`)
- **Authentication Entry Point**: Custom handler for unauthorized access attempts
- **Protected Routes**: Frontend route protection via `ProtectedRoute` component
- **JWT Secret**: Configurable secret key in `application.properties`
- **SQL Injection Prevention**: Parameterized queries via JPA/Hibernate
- **Password Encryption**: BCrypt hashing for password storage
- **Input Validation**: Server-side validation prevents malicious input
- **API Documentation**: Swagger UI available for API exploration (whitelisted endpoints)
