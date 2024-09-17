import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, TextField, Modal, Typography } from '@mui/material';

function PublisherPage() {
  const [publishers, setPublishers] = useState([]);
  const [newPublisher, setNewPublisher] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/publishers')
      .then(response => setPublishers(response.data))
      .catch(error => setError("Yayıncılar yüklenemedi."));
  }, []);

  const handleAddPublisher = () => {
    axios.post('/api/publishers', { name: newPublisher })
      .then(response => {
        setPublishers([...publishers, response.data]);
        setNewPublisher('');
        setOpen(false);
      })
      .catch(error => setError("Yayımcı eklenirken bir hata oluştu."));
  };

  const handleDeletePublisher = (id) => {
    axios.delete(`/api/publishers/${id}`)
      .then(() => setPublishers(publishers.filter(p => p.id !== id)))
      .catch(error => setError("Yayımcı silinirken bir hata oluştu."));
  };

  return (
    <Container>
      <Typography variant="h4">Yayımcılar</Typography>
      <Button onClick={() => setOpen(true)}>Yeni Yayımcı Ekle</Button>
      {publishers.map(publisher => (
        <div key={publisher.id}>
          <Typography>{publisher.name}</Typography>
          <Button onClick={() => handleDeletePublisher(publisher.id)}>Sil</Button>
        </div>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <TextField
            label="Yeni Yayımcı"
            value={newPublisher}
            onChange={(e) => setNewPublisher(e.target.value)}
          />
          <Button onClick={handleAddPublisher}>Ekle</Button>
        </div>
      </Modal>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
}

export default PublisherPage;
