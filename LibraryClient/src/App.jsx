import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PublisherPage from './pages/PublisherPage';
import CategoryPage from './pages/CategoryPage';
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import BorrowBookPage from './pages/BorrowBookPage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publisher" element={<PublisherPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/author" element={<AuthorPage />} />
        <Route path="/borrow" element={<BorrowBookPage />} />
      </Routes>
    </Router>
  );
}

export default App
