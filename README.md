# 📚 Library Management System

This is a full-stack **Library Management System**, developed as a capstone project for the Patika+ Frontend Web Developer Program. The system allows users to manage books, borrowers, authors, categories, publishers, and borrowing transactions. The backend API is built with **Spring Boot**, while the frontend interface is developed using **React**.

## 🌐 Live Demo
- **Backend**: [Library App Backend](https://github.com/Yldrmceyy/LibraryAppSpringBoot)
- **Frontend**: [Library App Frontend](https://github.com/Yldrmceyy/LibraryAppReact)

## 🚀 Features

### Backend
- Manage Books (Add, View, Update, Delete)
- Manage Borrowing Transactions (Borrow and Return Books)
- Manage Authors (Add, View, Update, Delete)
- Manage Categories (Add, View, Update, Delete)
- Manage Publishers (Add, View, Update, Delete)

### Frontend
- **User-friendly interface** for managing all library data
- Full **CRUD operations** for books, borrowers, borrowing transactions, authors, categories, and publishers
- **Custom modals** for error handling and notifications, ensuring a smooth user experience
- **Single Page Application (SPA)** using React Router for seamless navigation

## 🛠️ Technologies Used

### Backend
- **Spring Boot**: Framework for building RESTful APIs
- **Spring Data JPA**: Manages data persistence and database interactions
- **Hibernate**: Object-relational mapping (ORM) for handling database relationships
- **PostgreSQL**: Relational database management system
- **Maven**: Build automation tool for project dependency management

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For implementing SPA navigation
- **Material UI**: For styling and building responsive, reusable UI components
- **Axios**: HTTP client for making API requests to the backend
- **Custom Modals**: For handling user notifications and errors

## 🖥️ Running the Application Locally

### Prerequisites
- **Node.js** and **npm** or **yarn** installed
- **Java JDK** installed
- **Maven** installed
- **PostgreSQL** database up and running

## 🛠️ Technologies Used
- **Frontend Framework**: React
- **Routing**: React Router
- **Modal System**: Custom modal for error handling (no `window.alert` used)
- **CSS Framework**: CSS, Material UI
- **State Management**: React's `useState` and `useEffect` hooks for state and lifecycle management.

## 📚 Usage
Upon launching the application, you'll be able to navigate through the following pages:

- **Login Page**: Users can authenticate themselves here.
- **Publishers Page**: List, add, edit, or delete publishers.
- **Categories Page**: Manage book categories with full CRUD functionality.
- **Books Page**: View, add, edit, or delete books from the library.
- **Authors Page**: Handle authors' information with CRUD operations.
- **Borrowing Page**: Users can borrow books, and return them once done.

Each page is accessible through the navigation bar, and you can switch between them seamlessly thanks to React Router.


## 🖥️ Installation Instructions

### Prerequisites
- **Node.js** and **npm** or **yarn** installed
- **Java JDK** installed
- **Maven** installed
- **PostgreSQL** database up and running

### Backend Setup:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/library-management-frontend.git
    ```
2. Navigate into the project directory:
    ```bash
    cd library-management-frontend
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```
4. Run the development server:
    ```bash
    npm start
    ```
    or with yarn:
    ```bash
    yarn start
    ```
5. The application should now be running on `http://localhost:8080`.

### Frontend Setup:
1. Clone the repository:
    ```bash
    git clone https://github.com/Yldrmceyy/LibraryAppReact.git
    ```

2. Navigate into the project directory:
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

6. The frontend application will be running at: `http://localhost:5173`.




## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a pull request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

