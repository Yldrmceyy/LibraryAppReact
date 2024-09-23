import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box } from '@mui/material';
import PublisherForm from '../components/Publisher/PublisherForm';
import PublisherEdit from '../components/Publisher/PublisherEdit';
import PublisherTable from '../components/Publisher/PublisherTable';
import GeneralModal from '../components/GeneralModal'; 

function PublisherPage() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState({
    id: 0,
    name: '',
    establishmentYear: '',
    address: '',
  });
  const [editPublisher, setEditPublisher] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmText, setModalConfirmText] = useState('Confirm');
  const [modalConfirmColor, setModalConfirmColor] = useState('success');
  const [action, setAction] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`)
      .then((res) => setPublishers(res.data))
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to fetch publishers.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  }, []);

  const handleAddPublisher = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`, newPublisher)
      .then((res) => {
        setPublishers([...publishers, res.data]);
        setNewPublisher({ id: 0, name: '', establishmentYear: '', address: '' });
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Publisher added successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to add publisher.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };

  const handleUpdatePublisher = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${editPublisher.id}`,
        editPublisher
      )
      .then((res) => {
        setPublishers(
          publishers.map((publisher) =>
            publisher.id === editPublisher.id ? res.data : publisher
          )
        );
        setEditPublisher(null);
        setShowForm(false);
        setModalTitle('Success');
        setModalContent('Publisher updated successfully.');
        setModalConfirmColor('success');
        setModalConfirmText('Close');
        setModalOpen(true);
      })
      .catch(() => {
        setModalTitle('Error');
        setModalContent('Failed to update publisher.');
        setModalConfirmColor('error');
        setModalConfirmText('Close');
        setModalOpen(true);
      });
  };

  const handleDeletePublisher = (id) => {
    setModalTitle('Confirm Deletion');
    setModalContent('Are you sure you want to delete this publisher?');
    setModalConfirmText('Delete');
    setModalConfirmColor('error');
    setModalOpen(true);

    setAction(() => () => {
      axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
        .then(() => {
          setPublishers(publishers.filter((publisher) => publisher.id !== id));
          setModalTitle('Success');
          setModalContent('Publisher deleted successfully.');
          setModalConfirmColor('success');
          setModalConfirmText('Close');
        })
        .catch(() => {
          setModalTitle('Error');
          setModalContent('Failed to delete publisher.');
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
      <Box className="publisher-page-container">
        {showForm && (
          editPublisher ? (
            <PublisherEdit
              publisher={editPublisher}
              onChange={(field, value) => setEditPublisher({ ...editPublisher, [field]: value })}
              onSubmit={handleUpdatePublisher}
            />
          ) : (
            <PublisherForm
              publisher={newPublisher}
              onChange={(field, value) => setNewPublisher({ ...newPublisher, [field]: value })}
              onSubmit={handleAddPublisher}
            />
          )
        )}
        <PublisherTable
          publishers={publishers}
          onEdit={(publisher) => {
            setEditPublisher(publisher);
            setShowForm(true);
          }}
          onDelete={handleDeletePublisher}
          onAdd={() => {
            setNewPublisher({ id: 0, name: '', establishmentYear: '', address: '' });
            setEditPublisher(null);
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

export default PublisherPage;
