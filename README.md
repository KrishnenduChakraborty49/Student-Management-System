# 🎓 Student Management System

A full-stack web application designed to securely manage student records, built with a **Spring Boot** backend and a modern **React (Vite)** frontend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)

---

## ✨ Features

- **Robust Security:** Stateless JWT (JSON Web Token) based authentication.
- **Role-Based Access:** Support for `ADMIN` and `STUDENT` roles.
- **CRUD Operations:** Complete Create, Read, Update, and Delete functionality for student records.
- **Advanced Data Handling:** Server-side pagination, sorting, and real-time search filtering.
- **Modern UI/UX:** A responsive, dark-mode React frontend with smooth animations and centralized state management.
- **API Documentation:** Auto-generated interactive Swagger UI / OpenAPI documentation.

---

## 🛠️ Tech Stack

### **Backend**
- **Java 17**
- **Spring Boot 3.x** (Web, Data JPA, Security)
- **MySQL** (Relational Database)
- **Lombok** (Boilerplate reduction)
- **JJWT** (Token generation and validation)
- **SpringDoc OpenAPI** (Swagger documentation)

### **Frontend**
- **React.js** (Bootstrapped with Vite)
- **React Router v6** (Protected routing & navigation)
- **Axios** (API requests with automatic interceptors)
- **Pure CSS** (Custom dark-mode design system)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Database Setup
Ensure you have MySQL installed and running. Create a new database:
```sql
CREATE DATABASE sms_db;
```
*(Hibernate will automatically generate all necessary tables when you start the Spring Boot application).*

### 2. Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Update the database credentials in `src/main/resources/application.properties` if your MySQL username/password differs from the defaults.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
4. The server will start on `http://localhost:8080`. 
5. *Optional:* Access the Swagger API documentation at `http://localhost:8080/swagger-ui.html`.

### 3. Running the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The React application will be available at `http://localhost:5173`.

---

## 🔐 Initial Configuration

Before registering users, you need to populate the roles table in your database. Run the following SQL commands in your database client:
```sql
INSERT INTO roles(name) VALUES('STUDENT');
INSERT INTO roles(name) VALUES('ADMIN');
```
Once the roles exist, you can navigate to the frontend registration page, create an account, and start managing students!

---

## 👨‍💻 Author
**Krishnendu Chakraborty**
- GitHub: [@KrishnenduChakraborty49](https://github.com/KrishnenduChakraborty49)
