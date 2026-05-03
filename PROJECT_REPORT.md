# MAJOR PROJECT REPORT: SMARTCART E-COMMERCE PLATFORM

**Submitted for Partial Fulfillment of the Requirements for the Degree of Master of Computer Applications (MCA)**

---

## TABLE OF CONTENTS

**1. INTRODUCTION**
  - 1.1 Project Overview
  - 1.2 Problem Statement
  - 1.3 Objectives of the System
  - 1.4 Scope of the Project

**2. SYSTEM ANALYSIS**
  - 2.1 Existing System vs. Proposed System
  - 2.2 Feasibility Study
      - 2.2.1 Technical Feasibility
      - 2.2.2 Operational Feasibility
      - 2.2.3 Economic Feasibility
      - 2.2.4 Schedule Feasibility
  - 2.3 Hardware and Software Requirements

**3. TECHNOLOGIES USED**
  - 3.1 Java 17 and Spring Boot
  - 3.2 Spring Security and JWT
  - 3.3 Spring Data JPA and Hibernate
  - 3.4 React.js and Vite
  - 3.5 React Router and Axios

**4. SYSTEM DESIGN**
  - 4.1 Architecture Diagram
  - 4.2 Data Flow Diagrams (DFD)
  - 4.3 Entity Relationship (ER) Diagram
  - 4.4 Use Case Models

**5. IMPLEMENTATION DETAILS**
  - 5.1 Backend Implementation (Spring Boot)
  - 5.2 Frontend Implementation (React)

**6. SYSTEM TESTING**
  - 6.1 Unit Testing
  - 6.2 Integration Testing
  - 6.3 System Testing
  - 6.4 Usability and UI Testing

**7. CONCLUSION AND FUTURE SCOPE**
  - 7.1 Conclusion
  - 7.2 Future Scope

**8. BIBLIOGRAPHY AND REFERENCES**

---

# CHAPTER 1: INTRODUCTION

## 1.1 Project Overview
SmartCart is a comprehensive, scalable, and secure full-stack e-commerce web application. In today's fast-paced digital era, the transition from traditional brick-and-mortar retail to online shopping has accelerated exponentially. SmartCart aims to bridge the gap between businesses and consumers by providing a highly responsive, intuitive, and feature-rich platform. Built using modern enterprise-grade technologies like Spring Boot for the backend and React.js for the frontend, SmartCart delivers a seamless shopping experience for customers while offering a powerful management dashboard for administrators.

## 1.2 Problem Statement
Traditional retail systems and legacy e-commerce platforms often suffer from significant drawbacks:
- **Poor Performance:** Monolithic architectures lead to slow page load times and server bottlenecks during high traffic.
- **Security Vulnerabilities:** Weak authentication mechanisms expose sensitive user data and transaction details.
- **Lack of Scalability:** Tight coupling between the frontend and backend makes it difficult to scale or upgrade specific components without bringing down the entire system.
- **Suboptimal User Experience:** Outdated user interfaces that are not mobile-responsive deter potential customers.

There is a critical need for a modern, decoupled architecture that isolates the presentation layer from the business logic, ensuring that the system is secure, highly available, and capable of handling thousands of concurrent users.

## 1.3 Objectives of the System
The primary objectives of the SmartCart project include:
1. **Decoupled Architecture:** To design and implement a strictly decoupled Client-Server architecture utilizing RESTful APIs.
2. **Stateless Security:** To implement JSON Web Token (JWT) based authentication, ensuring secure, stateless, and scalable user sessions.
3. **Role-Based Access Control (RBAC):** To enforce strict authorization rules, distinguishing between standard `CUSTOMER` privileges and `ADMIN` privileges.
4. **Interactive UI/UX:** To develop a dynamic, single-page application (SPA) using React.js that provides instant feedback without full page reloads.
5. **Real-time Tracking:** To integrate mapping technologies (Leaflet) to simulate and visualize real-time order tracking.

## 1.4 Scope of the Project
The scope of SmartCart encompasses the entire lifecycle of an e-commerce transaction:
- **User Module:** Registration, authentication, and profile management.
- **Product Module:** Catalog browsing, category filtering, keyword searching, and server-side pagination.
- **Cart Module:** State management for adding, updating, and removing items.
- **Order Module:** Transactional checkout processes ensuring data integrity, inventory deduction, and order history tracking.
- **Admin Module:** A centralized dashboard for inventory management, order status updates, and revenue tracking.

---

# CHAPTER 2: SYSTEM ANALYSIS

## 2.1 Existing System vs. Proposed System
### Existing System
Many current academic or small-scale e-commerce projects use tightly coupled frameworks (like PHP/MySQL or JSP/Servlets) where the server renders HTML directly. This results in heavy server loads, slow navigation, and a poor user experience on mobile devices.

### Proposed System (SmartCart)
The proposed system uses a strictly decoupled architecture. The backend (Spring Boot) acts solely as an API provider, returning lightweight JSON data. The frontend (React) consumes this data and renders the UI on the client's device. This dramatically reduces server load, decreases bandwidth usage, and allows for the future development of mobile applications (iOS/Android) that can consume the exact same APIs.

## 2.2 Feasibility Study
The feasibility study evaluates the practicality of the proposed system across four dimensions:

### 2.2.1 Technical Feasibility
The project is technically highly feasible. It utilizes open-source, industry-standard technologies (Java, React, MySQL) that have massive community support and extensive documentation. The hardware requirements are standard, and the software dependencies are easily managed via Maven and NPM.

### 2.2.2 Operational Feasibility
The system is designed with a focus on User Experience (UX). The intuitive React frontend ensures a low learning curve for end-users. The Admin dashboard provides clear, actionable insights and easy-to-use forms for managing the platform, making it highly feasible for operational use.

### 2.2.3 Economic Feasibility
The project is economically feasible as it exclusively uses open-source software and frameworks. There are zero licensing costs associated with Java, Spring Boot, React, or MySQL. Furthermore, the decoupled architecture allows it to be hosted on free-tier cloud platforms like Vercel (Frontend) and Render (Backend).

### 2.2.4 Schedule Feasibility
By utilizing rapid application development tools like Spring Initializr, Lombok (for boilerplate reduction), and Vite (for fast frontend builds), the project was successfully completed within the allotted academic timeframe.

## 2.3 Hardware and Software Requirements

### Hardware Requirements (Minimum Server Specs)
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher.
- **RAM:** 8 GB Minimum (16 GB recommended for development).
- **Storage:** 256 GB SSD.
- **Network:** Broadband Internet Connection.

### Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Backend Language:** Java Development Kit (JDK) 17.
- **Backend Framework:** Spring Boot 3.2.x.
- **Frontend Environment:** Node.js (v18+) and NPM.
- **Frontend Library:** React.js 18.
- **Database:** MySQL Server 8.0.
- **IDE:** IntelliJ IDEA (Backend) and Visual Studio Code (Frontend).
- **API Testing:** Postman or Swagger.

---

# CHAPTER 3: TECHNOLOGIES USED

## 3.1 Java 17 and Spring Boot
Java 17 is a Long-Term Support (LTS) release providing enhanced performance and new language features like records and pattern matching. **Spring Boot** is an extension of the Spring framework that eliminates boilerplate configuration. It provides embedded servers (Tomcat), auto-configuration, and starter dependencies, allowing developers to focus on business logic rather than infrastructure setup.

## 3.2 Spring Security and JWT
**Spring Security** is a powerful and highly customizable authentication and access-control framework. In SmartCart, it is configured to be entirely stateless. Instead of using server-side HTTP sessions, it utilizes **JSON Web Tokens (JWT)**. Upon successful login, the server issues a digitally signed JWT. The React frontend stores this token and attaches it to the `Authorization` header of subsequent API requests. The server validates the signature to authorize the user, ensuring highly scalable security.

## 3.3 Spring Data JPA and Hibernate
**JPA (Java Persistence API)** is a specification for object-relational mapping (ORM) in Java. **Hibernate** is the implementation used in this project. It allows developers to map Java classes (`@Entity`) directly to MySQL database tables. This abstracts away complex SQL queries and protects against SQL Injection attacks.

## 3.4 React.js and Vite
**React.js** is a declarative, efficient, and flexible JavaScript library for building user interfaces. It utilizes a Virtual DOM to minimize expensive browser repaints, resulting in blazing-fast performance. **Vite** is a modern build tool that significantly improves the frontend development experience by serving code over native ES modules, offering near-instant hot module replacement (HMR).

## 3.5 React Router and Axios
**React Router DOM** enables client-side routing, allowing users to navigate between pages (like Cart, Products, Admin) without the browser requesting a new HTML document from the server. **Axios** is a promise-based HTTP client used to send asynchronous requests to the Spring Boot backend. Interceptors are heavily used in SmartCart to automatically attach JWTs to outgoing requests and handle global 401 Unauthorized errors.

---

# CHAPTER 4: SYSTEM DESIGN

System design translates the requirements into a blueprint for constructing the software.

## 4.1 Architecture Diagram
SmartCart follows a 3-Tier Architecture:
1. **Presentation Tier (React):** Handles UI rendering and user inputs.
2. **Application Tier (Spring Boot):** Contains the Controllers, Services, and Security Filters.
3. **Data Tier (MySQL):** The persistent storage layer.

## 4.2 Data Flow Diagrams (DFD)

### Level 0 DFD (Context Diagram)
The Context Diagram represents the entire system as a single process.
- **Entities:** Customer, Administrator.
- **Inputs:** Login Credentials, Product Searches, Cart Additions, Order Placements (from Customer). Product Details, Order Status Updates (from Admin).
- **Outputs:** JWT Tokens, Product Lists, Order Invoices, Tracking Coordinates.

### Level 1 DFD
Breaks down the system into core sub-processes:
1. **Process 1 (Authentication):** Verifies credentials against the DB and issues JWT.
2. **Process 2 (Catalog Management):** Retrieves paginated products from the DB.
3. **Process 3 (Order Processing):** Validates cart items, checks stock availability, calculates totals, deducts stock, and saves the order.

## 4.3 Entity Relationship (ER) Diagram
The relational database is normalized to ensure data integrity. Core entities include:
- **User:** `id`, `firstName`, `lastName`, `email`, `password`, `role`.
- **Product:** `id`, `name`, `description`, `price`, `stockQuantity`, `category`.
- **Order:** `id`, `user_id`, `status`, `totalAmount`, `shippingAddress`, `createdAt`.
- **OrderItem:** `id`, `order_id`, `product_id`, `quantity`, `unitPrice`.
- **Cart & CartItem:** Temporary storage linked to a User session.

### Relationships
- A User has a One-to-Many relationship with Orders.
- An Order has a One-to-Many relationship with OrderItems.
- A Product has a One-to-Many relationship with OrderItems.

## 4.4 Use Case Models

### Customer Use Cases
- `UC-01`: Register and Login.
- `UC-02`: Browse and Search Products.
- `UC-03`: Add to Cart and Modify Quantities.
- `UC-04`: Proceed to Checkout.
- `UC-05`: View Order History.
- `UC-06`: Track Live Order Status on Map.

### Administrator Use Cases
- `UC-07`: Login securely via Admin Gateway.
- `UC-08`: View Global Dashboard Statistics (Revenue, Pending Orders).
- `UC-09`: Add New Products to Catalog.
- `UC-10`: Edit or Delete Existing Products.
- `UC-11`: View Customer Orders and Update Shipping Status.

---

# CHAPTER 5: IMPLEMENTATION DETAILS

## 5.1 Backend Implementation (Spring Boot)

### Layered Architecture
The backend code is strictly segregated into layers:
- **Controllers (`@RestController`):** Expose API endpoints (e.g., `/api/products`). They consume Data Transfer Objects (DTOs) and return `ResponseEntity`.
- **Services (`@Service`):** Contain all business logic. For example, `OrderService.placeOrder()` is annotated with `@Transactional`. This ensures that if stock deduction succeeds but order saving fails, the entire database transaction is rolled back, preventing data corruption.
- **Repositories (`@Repository`):** Extend `JpaRepository`, providing built-in CRUD operations and dynamic query generation.

### Global Exception Handling
A `@RestControllerAdvice` class intercepts all exceptions thrown across the application. It formats them into a standardized JSON response format containing the timestamp, HTTP status, and error message, preventing raw stack traces from leaking to the frontend.

## 5.2 Frontend Implementation (React)

### Context API for State Management
The `AuthContext` wraps the entire application. It stores the currently logged-in user and their JWT token in `localStorage`. This context exposes functions like `login()`, `logout()`, and `isAuthenticated()`, making authentication state universally available to any component without prop-drilling.

### Protected Routes
A custom `<ProtectedRoute>` wrapper component ensures that unauthenticated users are immediately redirected to the `/login` page if they attempt to access protected URLs like `/orders` or `/checkout`. Furthermore, an `AdminRoute` wrapper strictly verifies the user's role before granting access to `/admin`.

### Component Modularity
The UI is broken down into highly reusable functional components (e.g., `ProductCard`, `Navbar`, `Footer`). The design system relies on vanilla CSS utilizing CSS Variables (`--primary`, `--bg`, `--text`) to seamlessly enforce a unified Dark Mode aesthetic across all pages.

---

# CHAPTER 6: SYSTEM TESTING

Testing ensures that the software meets its requirements and is free of critical defects.

## 6.1 Unit Testing
Individual components and methods were tested in isolation. For the backend, logic within the Service layer (such as calculating the exact total price of a cart based on unit prices and quantities) was validated to ensure mathematical accuracy and prevent floating-point errors.

## 6.2 Integration Testing
Integration testing verified the communication between different modules. For instance, the interaction between `OrderService` and `ProductRepository` was tested to ensure that when an order is placed, the product inventory is accurately decremented in the MySQL database.

## 6.3 System Testing
The system was tested as a complete, integrated application. This involved running both the React frontend and Spring Boot backend simultaneously and utilizing the browser to test end-to-end flows:
- **Test Case 1:** Registering a new account -> Logging in -> Adding a product to the cart -> Checking out. (Expected Result: Success, Order saved in DB).
- **Test Case 2:** Attempting to checkout with zero stock. (Expected Result: System rejects the action and displays an alert).
- **Test Case 3:** Attempting to access the Admin Dashboard as a standard Customer. (Expected Result: 403 Forbidden redirect).

## 6.4 Usability and UI Testing
The application was tested across different viewport sizes (Mobile, Tablet, Desktop) to ensure the CSS Flexbox and CSS Grid layouts responded appropriately. The interactive Leaflet map was tested to ensure the simulated coordinates rendered correctly based on order status.

---

# CHAPTER 7: CONCLUSION AND FUTURE SCOPE

## 7.1 Conclusion
The SmartCart project successfully demonstrates the design and implementation of a modern, full-stack e-commerce architecture. By decoupling the React frontend from the Spring Boot backend, the application achieves high performance, exceptional scalability, and a superior user experience. The integration of stateless JWT security, robust transactional database operations, and interactive visual features like live map tracking proves that the system is production-ready and meets all outlined academic objectives.

## 7.2 Future Scope
While the current implementation is highly functional, several enhancements could be integrated in the future:
1. **Payment Gateway Integration:** Implementing third-party services like Stripe or Razorpay to process actual credit card transactions.
2. **Cloud Object Storage:** Migrating product images from mock URLs to an AWS S3 bucket for reliable content delivery.
3. **Automated Email Systems:** Integrating Spring Boot Starter Mail to send automated order confirmation receipts and tracking updates to customers.
4. **Machine Learning Recommendations:** Implementing a collaborative filtering algorithm to suggest products to users based on their browsing and purchase history.
5. **Mobile Application:** Leveraging the existing REST APIs to build a cross-platform mobile application using React Native or Flutter.

---

# CHAPTER 8: BIBLIOGRAPHY AND REFERENCES

1. **Spring Boot Documentation:** Pivotal Software. *Spring Boot Reference Guide.* (https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
2. **React Documentation:** Meta Open Source. *React - A JavaScript library for building user interfaces.* (https://react.dev/)
3. **Hibernate ORM:** Red Hat. *Hibernate ORM Documentation.* (https://hibernate.org/orm/documentation/)
4. **JSON Web Tokens (JWT):** Internet Engineering Task Force (IETF) RFC 7519. (https://jwt.io/)
5. **React Leaflet:** *React components for Leaflet maps.* (https://react-leaflet.js.org/)
6. **Vite Build Tool:** Evan You. *Next Generation Frontend Tooling.* (https://vitejs.dev/)
7. **MySQL Reference Manual:** Oracle Corporation. (https://dev.mysql.com/doc/)
