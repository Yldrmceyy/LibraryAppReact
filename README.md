# 📚 Library Management System

This is a full-stack **Library Management System**, developed as a capstone project for the **Patika+ Frontend Web Developer Program**. It allows users to manage books, borrowers, authors, categories, publishers, and borrowing transactions. The backend API is built with **Spring Boot**, while the frontend is developed using **React**.

## 🌐 Live Demo
- **Backend**: [Library App Backend](https://github.com/Yldrmceyy/LibraryAppSpringBoot)
- **Frontend**: [Library App Frontend](https://github.com/Yldrmceyy/LibraryAppReact)

---

## 🚀 Features

### Backend
- **Manage Books**: Add, view, update, and delete books.
- **Borrowing Transactions**: Manage book borrow and return operations.
- **Manage Authors**: Add, view, update, and delete author information.
- **Manage Categories**: Add, view, update, and delete book categories.
- **Manage Publishers**: Add, view, update, and delete publisher information.

### Frontend
- **User-friendly interface** for managing all library data.
- Full **CRUD operations** for books, borrowers, borrowing transactions, authors, categories, and publishers.
- **Custom modals** for error handling and notifications.
- **Single Page Application (SPA)** using React Router for seamless navigation.

---

## 🛠️ Technologies Used

### Backend
- **Spring Boot**: RESTful API framework.
- **Spring Data JPA**: Manages data persistence and database interactions.
- **Hibernate**: ORM for database handling.
- **PostgreSQL**: Relational database system.
- **Maven**: Dependency and build management.

### Frontend
- **React**: JavaScript library for building UIs.
- **React Router**: For navigation and SPA support.
- **Material UI**: For responsive, reusable UI components.
- **Axios**: For making HTTP requests to the backend API.
- **Custom Modals**: For user notifications and error handling.

---

## 🖥️ Running the Application Locally

### Prerequisites
- **Node.js** and **npm** (or **yarn**) installed.
- **Java JDK** installed.
- **Maven** installed.
- **PostgreSQL** database running.

---

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/library-management-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd library-management-backend
    ```
3. Install the dependencies:
    ```bash
    mvn install
    ```
4. Run the application:
    ```bash
    mvn spring-boot:run
    ```
5. The backend will be running on `http://localhost:8080`.

---

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Yldrmceyy/LibraryAppReact.git
    ```

2. Navigate to the project directory:
    ```bash
    cd LibraryAppReact
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Update the `.env` file with your backend API URL.

5. Start the development server:
    ```bash
    npm run dev
    ```

6. The frontend application will be running at `http://localhost:5173`.

---

## 📚 Usage

Once the application is up and running, you can navigate through various pages:

- **Login Page**: Authenticate users.
- **Publishers Page**: List, add, edit, and delete publishers.
- **Categories Page**: Manage book categories with full CRUD functionality.
- **Books Page**: Add, edit, view, and delete books.
- **Authors Page**: Handle authors' information with CRUD operations.
- **Borrowing Page**: Borrow and return books.

All pages are accessible through the navigation bar, with smooth transitions powered by React Router.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
