import React, { useState, useEffect } from "react";
import axios from "axios";
import BorrowForm from "../components/Borrow/BorrowForm";
import BorrowEdit from "../components/Borrow/BorrowEdit";
import BorrowTable from "../components/Borrow/BorrowTable";
import GeneralModal from "../components/GeneralModal";

function BorrowPage() {
  const [borrowings, setBorrowings] = useState([]);
  const [newBorrowing, setNewBorrowing] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowingDate: "",
    bookForBorrowingRequest: {
      id: "",
      name: "",
      publicationYear: 0,
      stock: 0,
    },
  });
  const [editBorrowing, setEditBorrowing] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalConfirmText, setModalConfirmText] = useState("Close");
  const [modalConfirmColor, setModalConfirmColor] = useState("success");

  useEffect(() => {
    fetchBooks();
    fetchBorrowings();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`
      );
      setBooks(res.data);
    } catch (err) {
      setError("Failed to fetch books.");
    }
  };

  const fetchBorrowings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`
      );
      console.log("Fetched borrowings:", res.data); // Log the data
      setBorrowings(res.data);
    } catch (err) {
      setError("Failed to fetch borrowings.");
    }
  };

  const handleAddBorrowing = async (e) => {
    e.preventDefault();
    const borrowingDate = new Date();
    const returnDate = new Date(borrowingDate);
    returnDate.setMonth(returnDate.getMonth() + 1);

    const borrowingData = {
      borrowerName: newBorrowing.borrowerName,
      borrowerMail: newBorrowing.borrowerMail,
      borrowingDate: borrowingDate.toISOString(),
      returnDate: returnDate.toISOString(),
      bookForBorrowingRequest: {
        id: parseInt(newBorrowing.bookForBorrowingRequest.id, 10) || 0,
        name: newBorrowing.bookForBorrowingRequest.name,
        publicationYear: newBorrowing.bookForBorrowingRequest.publicationYear,
        stock: newBorrowing.bookForBorrowingRequest.stock,
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`,
        borrowingData
      );
      setBorrowings([...borrowings, res.data]);
      resetNewBorrowing();
      showModal("Success", "Borrowing added successfully.", "success");
    } catch (err) {
      setError("Failed to add borrowing.");
    }
  };

  const handleDeleteBorrowing = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${id}`
      );
      setBorrowings(borrowings.filter((borrowing) => borrowing.id !== id));
    } catch (err) {
      setError("Failed to delete borrowing.");
    }
  };

  const handleEditBorrowing = (borrowing) => {
    if (!borrowing) return;

    setEditBorrowing(borrowing);
    setNewBorrowing({
      borrowerName: borrowing.borrowerName,
      borrowerMail: borrowing.borrowerMail,
      borrowingDate: borrowing.borrowingDate,
      bookForBorrowingRequest: {
        id: borrowing.book.id, // Book nesnesinden al
        name: borrowing.book.name,
        publicationYear: borrowing.book.publicationYear,
        stock: borrowing.book.stock,
      },
    });
  };

  const handleBookSelect = (e) => {
    const selectedBookId = parseInt(e.target.value, 10);
    const selectedBook = books.find((book) => book.id === selectedBookId);
    setNewBorrowing((prev) => ({
      ...prev,
      bookForBorrowingRequest: selectedBook
        ? {
            id: selectedBook.id,
            name: selectedBook.name,
            publicationYear: selectedBook.publicationYear,
            stock: selectedBook.stock,
          }
        : {
            id: "",
            name: "",
            publicationYear: 0,
            stock: 0,
          },
    }));
  };

  const handleUpdateBorrowing = async (e) => {
    e.preventDefault();

    const borrowingDate = new Date(newBorrowing.borrowingDate);
    const returnDate = new Date(borrowingDate);
    returnDate.setMonth(returnDate.getMonth() + 1);

    const updatedData = {
      borrowerName: newBorrowing.borrowerName,
      borrowerMail: newBorrowing.borrowerMail, 
      borrowingDate: borrowingDate.toISOString(),
      returnDate: returnDate.toISOString(),
      book: {
        id: newBorrowing.bookForBorrowingRequest.id,
        name: newBorrowing.bookForBorrowingRequest.name,
        publicationYear: newBorrowing.bookForBorrowingRequest.publicationYear,
        stock: newBorrowing.bookForBorrowingRequest.stock,
      },
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows/${
          editBorrowing.id
        }`,
        updatedData
      );

      
      console.log("Güncellenen borrowing:", res.data);

     
      const updatedBorrowings = borrowings.map((borrowing) =>
        borrowing.id === editBorrowing.id ? res.data : borrowing
      );
      setBorrowings(updatedBorrowings);
      resetEditBorrowing();
      showModal("Success", "Borrowing updated successfully.", "success");
    } catch (err) {
      console.error(err.response.data);
      setError("Failed to update borrowing.");
    }
  };

  const resetNewBorrowing = () => {
    setNewBorrowing({
      borrowerName: "",
      borrowerMail: "",
      borrowingDate: "",
      bookForBorrowingRequest: {
        id: "",
        name: "",
        publicationYear: 0,
        stock: 0,
      },
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
      {editBorrowing ? (
        <BorrowEdit
          borrowRequest={newBorrowing}
          setBorrowRequest={setNewBorrowing}
          onSubmit={handleUpdateBorrowing}
          handleBookSelect={handleBookSelect}
          books={books}
        />
      ) : (
        <BorrowForm
          borrowRequest={newBorrowing}
          setBorrowRequest={setNewBorrowing}
          onSubmit={handleAddBorrowing}
          handleBookSelect={handleBookSelect}
          books={books}
        />
      )}
      {error && <div className="error">{error}</div>}
      <BorrowTable
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

export default BorrowPage;
