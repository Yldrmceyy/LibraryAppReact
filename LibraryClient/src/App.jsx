import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PublisherPage from "./pages/PublisherPage";
import CategoryPage from "./pages/CategoryPage";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import BorrowPage from "./pages/BorrowPage";
import Navbar from "./components/Navbar";


import './App.css'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publishers" element={<PublisherPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/borrows" element={<BorrowPage />} />
      </Routes>
    </>
  );
}

export default App;
