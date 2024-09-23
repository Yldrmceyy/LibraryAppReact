import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';
import AuthorForm from '../components/Author/AuthorForm';
import AuthorEdit from '../components/Author/AuthorEdit';
import AuthorTable from '../components/Author/AuthorTable';
import GeneralModal from '../components/GeneralModal'; 

function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    id: 0,
    name: '',
    birthDate: '',
    country: '',
  });
  const [editAuthor, setEditAuthor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('Confirm');
  const [modalConfirmColor, setModalConfirmColor] = useState('success');
  const [action, setAction] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`)
      .then((res) => setAuthors(res.data))
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to fetch authors.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  }, []);

  // Add new author
  const handleAddAuthor = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`, newAuthor)
      .then((res) => {
        setAuthors([...authors, res.data]);
        setNewAuthor({ id: 0, name: '', birthDate: '', country: '' });
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Author added successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to add author.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };

  // Update existing author
  const handleUpdateAuthor = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${editAuthor.id}`, editAuthor)
      .then((res) => {
        setAuthors(
          authors.map((author) =>
            author.id === editAuthor.id ? res.data : author
          )
        );
        setEditAuthor(null);
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Author updated successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to update author.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };

  // Delete author
  const handleDeleteAuthor = (id) => {
    setModalTitle('Confirm Deletion');
    setModalContent('Are you sure you want to delete this author?');
    setModalConfirmText('Delete');
    setModalConfirmColor('error');
    setModalOpen(true);

    setAction(() => () => {
      axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${id}`)
        .then(() => {
          setAuthors(authors.filter((author) => author.id !== id));
          setModalTitle('Success');
          setModalContent('Author deleted successfully.');
          setModalConfirmColor('success');
          setModalConfirmText('Close');
        })
        .catch(() => {
          setModalTitle('Error');
          setModalContent('Failed to delete author.');
          setModalConfirmColor('error');
          setModalConfirmText('Close');
        });
    });
  };

  // Confirm modal action
  const handleModalConfirm = () => {
    if (action) action();
    setModalOpen(false);
  };

  return (
    <Container component="main">
      <Box className="author-page-container">
        {showForm && (
          editAuthor ? (
            <AuthorEdit
              author={editAuthor}
              onChange={(field, value) => setEditAuthor({ ...editAuthor, [field]: value })}
              onSubmit={handleUpdateAuthor}
            />
          ) : (
            <AuthorForm
              author={newAuthor}
              onChange={(field, value) => setNewAuthor({ ...newAuthor, [field]: value })}
              onSubmit={handleAddAuthor}
            />
          )
        )}
        <AuthorTable
          authors={authors}
          onEdit={(author) => {
            setEditAuthor(author);
            setShowForm(true);
          }}
          onDelete={handleDeleteAuthor}
          onAdd={() => {
            setNewAuthor({ id: 0, name: '', birthDate: '', country: '' });
            setEditAuthor(null);
            setShowForm(true);
          }}
        />
        <GeneralModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          content={modalContent}
          onConfirm={handleModalConfirm}
          confirmText={modalConfirmText}
          confirmColor={modalConfirmColor}
        />
      </Box>
    </Container>
  );
}

export default AuthorPage;
