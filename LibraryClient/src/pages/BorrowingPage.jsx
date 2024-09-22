import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookBorrowForm from '../components/BookBorrow/BookBorrowForm';
import BookBorrowEdit from '../components/BookBorrow/BookBorrowEdit';
import BookBorrowTable from '../components/BookBorrow/BookBorrowTable';
import GeneralModal from '../components/GeneralModal';

function BorrowingPage() {
  const [borrowings, setBorrowings] = useState([]);
  const [newBorrowing, setNewBorrowing] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    bookForBorrowingRequest: {
      id: '',
      name: '',
      publicationYear: 0,
      stock: 0
    }
  });
  const [editBorrowing, setEditBorrowing] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('Close');
  const [modalConfirmColor, setModalConfirmColor] = useState('success');

  useEffect(() => {
    fetchBooks();
    fetchBorrowings();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`);
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books.');
    }
  };

  const fetchBorrowings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`); // Güncellenmiş URL
      setBorrowings(res.data);
    } catch (err) {
      setError('Failed to fetch borrowings.');
    }
  };

 const handleAddBorrowing = async (e) => {
  e.preventDefault();

  const borrowingDate = new Date(); // Bugünün tarihi
  const returnDate = new Date(borrowingDate);
  returnDate.setMonth(returnDate.getMonth() + 1); // 1 ay ekle

  const borrowingData = {
    borrowerName: newBorrowing.borrowerName,
    borrowerMail: newBorrowing.borrowerMail,
    borrowingDate: borrowingDate.toISOString(), // ISO formatında
    returnDate: returnDate.toISOString(), // ISO formatında
    bookForBorrowingRequest: {
      id: parseInt(newBorrowing.bookForBorrowingRequest.id, 10) || 0,
      name: newBorrowing.bookForBorrowingRequest.name,
      publicationYear: newBorrowing.bookForBorrowingRequest.publicationYear,
      stock: newBorrowing.bookForBorrowingRequest.stock
    }
  };

  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`, borrowingData);
    setBorrowings([...borrowings, res.data]);
    resetNewBorrowing();
    showModal('Success', 'Borrowing added successfully.', 'success');
  } catch (err) {
    setError('Failed to add borrowing.');
  }
};


  const handleDeleteBorrowing = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${id}`); // Güncellenmiş URL
      setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
    } catch (err) {
      setError('Failed to delete borrowing.');
    }
  };

  const handleBookSelect = (e) => {
    const selectedBook = books.find(book => book.id === parseInt(e.target.value, 10));
    setNewBorrowing(prev => ({
      ...prev,
      bookForBorrowingRequest: selectedBook ? {
        id: selectedBook.id,
        name: selectedBook.name,
        publicationYear: selectedBook.publicationYear,
        stock: selectedBook.stock
      } : {
        id: '',
        name: '',
        publicationYear: 0,
        stock: 0
      }
    }));
  };

  const handleEditBorrowing = (borrowing) => {
    setEditBorrowing(borrowing);
    setNewBorrowing({
      borrowerName: borrowing.borrowerName,
      borrowerMail: borrowing.borrowerMail,
      borrowingDate: borrowing.borrowingDate,
      bookForBorrowingRequest: {
        id: borrowing.bookForBorrowingRequest.id,
        name: borrowing.bookForBorrowingRequest.name,
        publicationYear: borrowing.bookForBorrowingRequest.publicationYear,
        stock: borrowing.bookForBorrowingRequest.stock
      }
    });
  };

  const handleUpdateBorrowing = async (e) => {
    e.preventDefault();

    const updatedData = {
      borrowerName: newBorrowing.borrowerName,
      borrowerMail: newBorrowing.borrowerMail,
      borrowingDate: newBorrowing.borrowingDate,
      bookForBorrowingRequest: {
        id: newBorrowing.bookForBorrowingRequest.id,
        name: newBorrowing.bookForBorrowingRequest.name,
        publicationYear: newBorrowing.bookForBorrowingRequest.publicationYear,
        stock: newBorrowing.bookForBorrowingRequest.stock
      }
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${editBorrowing.id}`, updatedData); // Güncellenmiş URL
      const updatedBorrowings = borrowings.map(borrowing => 
        borrowing.id === editBorrowing.id ? res.data : borrowing
      );
      setBorrowings(updatedBorrowings);
      resetEditBorrowing();
      showModal('Success', 'Borrowing updated successfully.', 'success');
    } catch (err) {
      setError('Failed to update borrowing.');
    }
  };

  const resetNewBorrowing = () => {
    setNewBorrowing({
      borrowerName: '',
      borrowerMail: '',
      borrowingDate: '',
      bookForBorrowingRequest: {
        id: '',
        name: '',
        publicationYear: 0,
        stock: 0
      }
    });
  };

  const resetEditBorrowing = () => {
    setEditBorrowing(null);
    resetNewBorrowing();
  };

  const showModal = (title, content, color) => {
    setModalTitle(title);
    setModalContent(content);
    setModalConfirmColor(color);
    setModalOpen(true);
  };

  return (
    <div className="borrowing-page">
      <h1>Book Borrowing</h1>
      {editBorrowing ? (
        <BookBorrowEdit
          borrowRequest={newBorrowing}
          setBorrowRequest={setNewBorrowing}
          onSubmit={handleUpdateBorrowing}
        />
      ) : (
        <BookBorrowForm
          borrowRequest={newBorrowing}
          setBorrowRequest={setNewBorrowing}
          onSubmit={handleAddBorrowing}
          handleBookSelect={handleBookSelect}
          books={books}
        />
      )}
      {error && <div className="error">{error}</div>}
      <BookBorrowTable
        borrowRecords={borrowings}
        onEdit={handleEditBorrowing}
        onDelete={handleDeleteBorrowing}
      />
      <GeneralModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        content={modalContent}
        onConfirm={() => setModalOpen(false)}
        confirmText={modalConfirmText}
        confirmColor={modalConfirmColor}
      />
    </div>
  );
}

export default BorrowingPage;
