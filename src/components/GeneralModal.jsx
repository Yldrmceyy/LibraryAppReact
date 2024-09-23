import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const GeneralModal = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  confirmText,
  confirmColor
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: confirmColor === 'success' ? '#dff0d8' : '#f2dede', 
          border: '2px solid',
          borderColor: confirmColor === 'success' ? '#d0e9c6' : '#ebccd1',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GeneralModal;
