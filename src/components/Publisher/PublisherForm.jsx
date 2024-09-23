import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const PublisherForm = ({ publisher, onChange, onSubmit, error }) => {
  return (
    <Box className="form-container" >
      <Typography component="h1" variant="h5">
        {publisher.id ? 'Update Publisher' : 'Add Publisher'}
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Publisher Name"
          fullWidth
          value={publisher.name}
          onChange={(e) => onChange('name', e.target.value)}
         
        />
        <TextField
          label="Establishment Year"
          fullWidth
          type="number"
          value={publisher.establishmentYear}
          onChange={(e) => onChange('establishmentYear', e.target.value)}
         
        />
        <TextField
          label="Address"
          fullWidth
          value={publisher.address}
          onChange={(e) => onChange('address', e.target.value)}
         
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {publisher.id ? 'Update Publisher' : 'Add Publisher'}
        </Button>
      </Box>
    </Box>
  );
};

export default PublisherForm;
