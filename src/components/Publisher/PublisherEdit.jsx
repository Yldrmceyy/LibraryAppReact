import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function PublisherEdit({ publisher, onChange, onSubmit, error }) {
  return (
    <Box
      className="form-container"
      sx={{ maxWidth: 500, margin: '0 auto', padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: 2 }}
    >
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2, color: '#303f9f' }}>
        {publisher.id ? 'Update Publisher' : 'Add Publisher'}
      </Typography>
      <form onSubmit={onSubmit} className="publisher-form" noValidate>
        <TextField
          label="Publisher Name"
          fullWidth
          value={publisher.name}
          onChange={(e) => onChange('name', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Establishment Year"
          fullWidth
          type="number"
          value={publisher.establishmentYear}
          onChange={(e) => onChange('establishmentYear', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Address"
          fullWidth
          value={publisher.address}
          onChange={(e) => onChange('address', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#303f9f',
            ':hover': { backgroundColor: '#ffeb3b', color: '#303f9f' },
          }}
        >
          {publisher.id ? 'Update Publisher' : 'Add Publisher'}
        </Button>
      </form>
    </Box>
  );
}

export default PublisherEdit;
