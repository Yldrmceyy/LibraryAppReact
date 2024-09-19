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
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to fetch categories.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`, newCategory)
      .then((res) => {
        setCategories([...categories, res.data]);
        setNewCategory({ id: 0, name: '', description: '' });
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Category added successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to add category.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${editCategory.id}`,
        editCategory
      )
      .then((res) => {
        setCategories(
          categories.map((category) =>
            category.id === editCategory.id ? res.data : category
          )
        );
        setEditCategory(null);
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Category updated successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to update category.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };
  
  
  const handleDeleteCategory = (id) => {
    setModalTitle('Confirm Deletion');
    setModalContent('Are you sure you want to delete this category?');
    setModalConfirmText('Delete');
    setModalConfirmColor('error');
    setModalOpen(true);

    setAction(() => () => {
      axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`)
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
          setModalTitle('Success');
          setModalContent('Category deleted successfully.');
          setModalConfirmColor('success');
          setModalConfirmText('Close');
        })
        .catch(() => {
          setModalTitle('Error');
          setModalContent('Failed to delete category.');
          setModalConfirmColor('error');
          setModalConfirmText('Close');
        });
    });
  };

  const handleModalConfirm = () => {
    if (action) action();
    setModalOpen(false);
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
