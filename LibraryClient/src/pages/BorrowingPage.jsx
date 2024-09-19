import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Kitapları ve ödünç alınan kitapları listele
    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`)
      .then(res => setBooks(res.data))
      .catch(err => setError('Failed to fetch books.'));

    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrowings`)
      .then(res => setBorrowings(res.data))
      .catch(err => setError('Failed to fetch borrowings.'));
  }, []);

  // Kitap alma işlemi
  const handleAddBorrowing = (e) => {
    e.preventDefault();

    // Veriyi sunucuya uygun formatta hazırlayın
   
  const borrowingData = {
    borrowerName: newBorrowing.borrowerName,
    borrowerMail: newBorrowing.borrowerMail,
    borrowingDate: newBorrowing.borrowingDate,
    bookForBorrowingRequest: {
      id: parseInt(newBorrowing.bookForBorrowingRequest.id, 10) || 0,
      name: newBorrowing.bookForBorrowingRequest.name,
      publicationYear: newBorrowing.bookForBorrowingRequest.publicationYear,
      stock: newBorrowing.bookForBorrowingRequest.stock
    }
  };

  console.log('Sending borrowing data:', borrowingData);

  axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrowings`, borrowingData)
    .then(res => {
      console.log('Borrowing added successfully:', res.data);
      setBorrowings([...borrowings, res.data]);
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
    })
    .catch(err => {
      console.error('Error adding borrowing:', err.response ? err.response.data : err.message);
      setError('Failed to add borrowing.');
    });
};
  // Ödünç alınan kitap sil
  const handleDeleteBorrowing = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrowings/${id}`)
      .then(() => setBorrowings(borrowings.filter(borrowing => borrowing.id !== id)))
      .catch(err => setError('Failed to delete borrowing.'));
  };

  // Seçilen kitabın bilgilerini güncelle
  const handleBookSelect = (e) => {
    const selectedBook = books.find(book => book.id === parseInt(e.target.value, 10));
    setNewBorrowing({
      ...newBorrowing,
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
    });
  };

  return (
    <div className="borrowing-page">
      <h1>Book Borrowing</h1>
      <form onSubmit={handleAddBorrowing}>
        <select
          value={newBorrowing.bookForBorrowingRequest.id}
          onChange={handleBookSelect}
        >
          <option value="">Select Book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Borrower Name"
          value={newBorrowing.borrowerName}
          onChange={(e) => setNewBorrowing({ ...newBorrowing, borrowerName: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Borrower Email"
          value={newBorrowing.borrowerMail}
          onChange={(e) => setNewBorrowing({ ...newBorrowing, borrowerMail: e.target.value })}
        />
        <br />
        <input
          type="date"
          value={newBorrowing.borrowingDate}
          onChange={(e) => setNewBorrowing({ ...newBorrowing, borrowingDate: e.target.value })}
        />
        <br />
        <button type="submit">Add Borrowing</button>
      </form>
      {error && <div className="error">{error}</div>}
      <ul>
        {borrowings.map(borrowing => (
          <li key={borrowing.id}>
            {borrowing.bookForBorrowingRequest?.name || "Unknown Book"} - {borrowing.borrowerName} ({borrowing.borrowingDate})
            <button onClick={() => handleDeleteBorrowing(borrowing.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BorrowingPage;
