import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PublisherTable = ({ publishers, onEdit, onDelete, onAdd }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Establishment Year</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell>{publisher.id}</TableCell>
              <TableCell>{publisher.name}</TableCell>
              <TableCell>{publisher.establishmentYear}</TableCell>
              <TableCell>{publisher.address}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(publisher)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(publisher.id)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PublisherTable;
