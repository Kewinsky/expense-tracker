# Spendee

## Overview

Spendee is a full-stack personal finance management application that enables users to track expenses, manage income, categorize transactions, and analyze spending patterns through interactive visualizations.

- **Problem it solves**: Helps users monitor spending habits, track income vs. expenses, identify spending trends by category and time period, and maintain organized financial records with visual analytics.
- **Who it is for**: Individuals and small businesses looking for a personal finance tracking solution with data visualization and reporting capabilities.

## Key Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control (USER, MODERATOR, ADMIN), user registration, login, and password reset functionality
- **Financial Transaction Management**: Complete CRUD operations for expenses and income records with category management, transaction filtering by month/year, and date-based tracking
- **Dashboard & Analytics**: Interactive dashboard with bar charts for category breakdowns, line charts for monthly/yearly trends, utilities tracking (Electricity, Gas, Water), and income vs. expense comparisons
- **User Experience**: Dark mode support with theme persistence, responsive Bootstrap design, toast notifications, month/year navigation, and monthly notes functionality
- **Administrative Features**: User management for ADMIN/MODERATOR roles, user profile updates, and predefined category assignment for new users

## Tech Stack

### Frontend

- **Framework**: React 18
- **Routing**: React Router DOM
- **Data Visualization**: Chart.js, React-ChartJS-2
- **UI Components**: React Bootstrap, Bootstrap
- **HTTP Client**: Axios
- **Styling**: SASS
- **Notifications**: React Toastify
- **Icons**: React Icons

### Backend

- **Language**: Java 19
- **Framework**: Spring Boot 2.6.6
- **Security**: Spring Security with JWT
- **Data Access**: Spring Data JPA with Hibernate
- **Code Generation**: Lombok
- **API Documentation**: Springfox Swagger 3
- **Validation**: Spring Validation
- **Build Tool**: Maven

### Database

- **Primary Database**: MySQL
- **Schema Management**: Hibernate DDL Auto

### Infrastructure / Cloud

- **Containerization**: Docker & Docker Compose
- **Production Hosting**: AWS (EC2 for backend, S3 for frontend, RDS for MySQL)

### Tooling & DevOps

- **Build Tools**: Maven, npm
- **API Documentation**: Swagger UI

## Architecture & Design

### High-Level Architecture

- **Frontend**: React SPA communicating with REST API via Axios
- **Backend**: Spring Boot REST API with JWT authentication
- **Database**: MySQL for persistent data storage

### Design Decisions

- **JWT Authentication**: Stateless authentication using JWT tokens stored client-side for scalable session management
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
│   │   ├── controllers/       # REST API controllers
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

- Java Development Kit (JDK) 19 or higher
- Node.js and npm
- MySQL Server (or use Docker Compose)
- Docker and Docker Compose (for containerized deployment)
- Maven 3.6+ (or use included Maven wrapper)

### Installation Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd expense-tracker
```

2. Backend Setup:

```bash
cd backend
mvn clean install
```

3. Frontend Setup:

```bash
cd ../frontend
npm install
```

4. Database Configuration:
   - Update `backend/src/main/resources/application.properties` with your database credentials
   - Create the MySQL database: `expense_tracker`
   - (Optional) Insert test data from `backend/src/main/resources/samples/test_data.sql`

### Environment Variables (Docker Compose)

For Docker Compose deployment, create a `.env` file in the root directory:

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
```

### Running the Project Locally

**Option 1: Traditional Development (Separate Services)**

1. Start MySQL database (if not using Docker)

2. Start Backend:

```bash
cd backend
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

3. Start Frontend (in a separate terminal):

```bash
cd frontend
npm start
```

Frontend will run on `http://localhost:3000`

**Option 2: Docker Compose (Recommended for Raspberry Pi)**

1. Create `.env` file in the root directory with required environment variables

2. Start all services:

```bash
docker-compose up
```

3. Stop all services:

```bash
docker-compose down
```

4. Access the application:
   - Frontend: `http://localhost:3000` (or configured `REACT_LOCAL_PORT`)
   - Backend API: `http://localhost:8080` (or configured `SPRING_LOCAL_PORT`)
   - Swagger UI: `http://localhost:8080/swagger-ui/`

### Default Test Credentials

- Username: `admin`
- Password: `admin`

## Deployment

### Deployment Approach

- **Docker Compose**: Containerized deployment for local/edge deployment (Raspberry Pi) with orchestrated MySQL, Spring Boot backend, and React frontend services
- **Production**: Backend deployed on Amazon EC2, frontend hosted on Amazon S3, database hosted on Amazon RDS (MySQL)

### Hosting / Cloud Services

- **Application Hosting**: Amazon EC2 (backend), Amazon S3 (frontend)
- **Database**: Amazon RDS (MySQL)
- **Containerization**: Docker for local/edge deployment

## Security & Best Practices

### Authentication / Authorization

- **Authentication**: JWT-based stateless authentication with tokens stored client-side and validated on each request
- **Authorization**: Role-based access control (USER, MODERATOR, ADMIN) with method-level security using `@PreAuthorize` annotations
- **Password Security**: BCrypt password encoding with custom password validator for strength requirements

### Data Validation and Error Handling

- **Input Validation**: Spring Validation annotations and custom validation for password strength
- **Exception Handling**: Custom exception classes with global exception handlers using `@ControllerAdvice` for consistent error responses

### Security-Related Practices

- **CORS Configuration**: Configured for allowed origins (configurable via `app.cors.allowedOrigins`)
- **Session Management**: Stateless sessions (`SessionCreationPolicy.STATELESS`)
- **SQL Injection Prevention**: Parameterized queries via JPA/Hibernate
- **Password Encryption**: BCrypt hashing for password storage
- **Protected Routes**: Frontend route protection via `ProtectedRoute` component
- **API Documentation**: Swagger UI available for API exploration (whitelisted endpoints)
