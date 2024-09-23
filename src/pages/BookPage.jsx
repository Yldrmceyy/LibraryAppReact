import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box } from "@mui/material";
import BookForm from "../components/Book/BookForm";
import BookEdit from "../components/Book/BookEdit";
import BookTable from "../components/Book/BookTable";
import GeneralModal from "../components/GeneralModal";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({
    id: 0,
    name: "",
    publicationYear: 0,
    stock: 0,
    author: { id: 0, name: "" },
    publisher: { id: 0, name: "" },
    categories: [],
  });
  const [editBook, setEditBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalConfirmText, setModalConfirmText] = useState("Confirm");
  const [modalConfirmColor, setModalConfirmColor] = useState("success");
  const [action, setAction] = useState(null);

  useEffect(() => {
    // Fetch books
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`)
      .then((res) => setBooks(res.data))
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to fetch books.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });

    // Fetch authors
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`)
      .then((res) => setAuthors(res.data))
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to fetch authors.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });

    // Fetch publishers
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`)
      .then((res) => setPublishers(res.data))
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to fetch publishers.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });

    // Fetch categories
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to fetch categories.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });
  }, []);

  const handleAddBook = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`, newBook)
      .then(() => {
        setModalTitle("Success");
        setModalContent("Book added successfully.");
        setModalConfirmColor("success");
        setModalConfirmText("Close");
        setModalOpen(true);
        setShowForm(false);
        setNewBook({
          id: 0,
          name: "",
          publicationYear: 0,
          stock: 0,
          author: { id: 0, name: "" },
          publisher: { id: 0, name: "" },
          categories: [],
        });
        // Refresh book list
        axios
          .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`)
          .then((res) => setBooks(res.data));
      })
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to add book.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });
  };

  const handleUpdateBook = (event) => {
    event.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${editBook.id}`,
        editBook
      )
      .then(() => {
        setModalTitle("Success");
        setModalContent("Book updated successfully.");
        setModalConfirmColor("success");
        setModalConfirmText("Close");
        setModalOpen(true);
        setShowForm(false);
        setEditBook(null);
        // Refresh book list
        axios
          .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`)
          .then((res) => setBooks(res.data));
      })
      .catch(() => {
        setModalTitle("Error");
        setModalContent("Failed to update book.");
        setModalConfirmColor("error");
        setModalConfirmText("Close");
        setModalOpen(true);
      });
  };

  const handleDeleteBook = (id) => {
    // Modal açma ve konfigürasyon
    setModalTitle("Confirm Deletion");
    setModalContent("Are you sure you want to delete this book?");
    setModalConfirmText("Delete");
    setModalConfirmColor("error");
    setModalOpen(true);

    // Aksiyon fonksiyonunu ayarlama
    setAction(() => () => {
      axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`)
        .then(() => {
          // Başarılı silme sonrası kitaplar listesini güncelle
          setBooks(books.filter((book) => book.id !== id));
          setModalTitle("Success");
          setModalContent("Book deleted successfully.");
          setModalConfirmColor("success");
          setModalConfirmText("Close");
        })
        .catch(() => {
          setModalTitle("Error");
          setModalContent("Failed to delete book.");
          setModalConfirmColor("error");
          setModalConfirmText("Close");
        });
    });
  };

  const handleModalConfirm = () => {
    if (action) {
      action();
      setAction(null);
    }
    setModalOpen(false);
  };

  return (
    <Container>
      <Box>
        {showForm && (
          <>
            {editBook ? (
              <BookEdit
                book={editBook}
                authors={authors}
                publishers={publishers}
                categories={categories}
                onChange={(field, value) =>
                  setEditBook({ ...editBook, [field]: value })
                }
                onSubmit={handleUpdateBook}
              />
            ) : (
              <BookForm
                book={newBook}
                authors={authors}
                publishers={publishers}
                categories={categories}
                onChange={(field, value) =>
                  setNewBook({ ...newBook, [field]: value })
                }
                onSubmit={handleAddBook}
              />
            )}
          </>
        )}
        <BookTable
          books={books}
          authors={authors}
          publishers={publishers}
          categories={categories}
          onEdit={(book) => {
            setEditBook(book);
            setShowForm(true);
          }}
          onDelete={handleDeleteBook}
          onAdd={() => {
            setShowForm(true);
            setEditBook(null);
          }}
        />
      </Box>
      <GeneralModal
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Ensure this is correctly assigned
        title={modalTitle}
        content={modalContent}
        onConfirm={handleModalConfirm}
        confirmText={modalConfirmText}
        confirmColor={modalConfirmColor}
      />
    </Container>
  );
}

export default BookPage;
