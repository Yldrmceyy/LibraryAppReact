import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';
import CategoryForm from '../components/Category/CategoryForm';
import CategoryEdit from '../components/Category/CategoryEdit';
import CategoryTable from '../components/Category/CategoryTable';
import GeneralModal from '../components/GeneralModal';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    id: 0,
    name: '',
    description: '',
  });
  const [editCategory, setEditCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('Confirm');
  const [modalConfirmColor, setModalConfirmColor] = useState('success');
  const [action, setAction] = useState(null);

  useEffect(() => {
    // Fetch categories on component mount
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => {
        openModal('Error', 'Failed to fetch categories.', 'error', 'Close');
      });
  }, []);

  // Open modal helper function
  const openModal = (title, content, confirmColor = 'success', confirmText = 'Close') => {
    setModalTitle(title);
    setModalContent(content);
    setModalConfirmColor(confirmColor);
    setModalConfirmText(confirmText);
    setModalOpen(true);
  };

  // Add new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`, newCategory)
      .then((res) => {
        setCategories([...categories, res.data]);
        setNewCategory({ id: 0, name: '', description: '' });
        setShowForm(false);
        openModal('Success', 'Category added successfully.');
      })
      .catch(() => {
        openModal('Error', 'Failed to add category.', 'error', 'Close');
      });
  };

  // Update existing category
  const handleUpdateCategory = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${editCategory.id}`, editCategory)
      .then((res) => {
        setCategories(categories.map((category) => 
          category.id === editCategory.id ? res.data : category
        ));
        setEditCategory(null);
        setShowForm(false);
        openModal('Success', 'Category updated successfully.');
      })
      .catch(() => {
        openModal('Error', 'Failed to update category.', 'error', 'Close');
      });
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    openModal('Confirm Deletion', 'Are you sure you want to delete this category?', 'error', 'Delete');

    setAction(() => () => {
      axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
          openModal('Success', 'Category deleted successfully.');
        })
        .catch(() => {
          openModal('Error', 'Failed to delete category.', 'error', 'Close');
        });
    });
  };

  // Confirm modal action
  const handleModalConfirm = () => {
    if (action) action();
    setAction(null); // Reset action after confirmation
    setModalOpen(false); // Close modal
  };

  return (
    <Container component="main">
      <Box className="category-page-container">
        {showForm && (
          editCategory ? (
            <CategoryEdit
              category={editCategory}
              onChange={(field, value) => setEditCategory({ ...editCategory, [field]: value })}
              onSubmit={handleUpdateCategory}
            />
          ) : (
            <CategoryForm
              category={newCategory}
              onChange={(field, value) => setNewCategory({ ...newCategory, [field]: value })}
              onSubmit={handleAddCategory}
            />
          )
        )}
        <CategoryTable
          categories={categories}
          onEdit={(category) => {
            setEditCategory(category);
            setShowForm(true);
          }}
          onDelete={handleDeleteCategory}
          onAdd={() => {
            setNewCategory({ id: 0, name: '', description: '' });
            setEditCategory(null);
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

export default CategoryPage;
