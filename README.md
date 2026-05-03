# SmartCart 🛒

SmartCart is a modern, responsive, full-stack e-commerce web application built to deliver a premium online shopping experience. It features a robust Spring Boot backend with a sleek, dark-mode React frontend.

## 🚀 Features

- **Authentication & Security:** Secure JWT-based authentication with role-based access control (Customer vs. Admin).
- **Product Catalog:** Browse products with advanced filtering, searching, and server-side pagination.
- **Shopping Cart:** Add, remove, and update quantities of items in real-time.
- **Checkout & Orders:** Place orders with an intuitive checkout summary.
- **Live Order Tracking:** Interactive, map-based order tracking using React-Leaflet to visualize shipment status.
- **Admin Dashboard:** Dedicated portal for admins to manage products (CRUD) and oversee customer orders.
- **Modern UI:** A custom-built dark-mode design system with responsive layouts, smooth animations, and micro-interactions.

## 💻 Tech Stack

### Frontend
- **React 18** (with Vite)
- **React Router DOM** (for navigation)
- **Axios** (for API communication and Interceptors)
- **React Leaflet** (for map tracking)
- **Vanilla CSS** (Custom Design System)

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security** (with JWT)
- **Spring Data JPA** (Hibernate)
- **MySQL** (Relational Database)
- **Lombok** (Boilerplate reduction)

---

## 🛠️ Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL Server running locally

### 1. Database Setup
Create a new MySQL database named `smartcart_db`.
```sql
CREATE DATABASE smartcart_db;
```
*Note: Ensure your MySQL credentials match `root/root` or update the `application.properties` file in the backend.*

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application (Maven wrapper or your local Maven installation):
   ```bash
   mvn spring-boot:run
   ```
*The backend will automatically create all necessary tables and seed 50 premium tech products on the first startup!*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`.

---

## 👑 Admin Access

By default, any new account created via the "Register" page is assigned the `CUSTOMER` role. 

To access the Admin Dashboard, you need an `ADMIN` role. You can promote your user account directly via the MySQL database:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```
Once updated, log out and log back in to see the **Admin** tab in the navigation bar.

## 📄 License

This project was built as a demonstration of a complete, production-ready Full-Stack Architecture. Feel free to fork and modify!
