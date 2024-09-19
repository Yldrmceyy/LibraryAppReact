import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Button, Paper, Typography } from '@mui/material';

const PublisherTable = ({ publishers, onEdit, onDelete, onAdd }) => {
  return (
    <TableContainer component={Paper}>
       <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        sx={{ mt: 2 }}
      >
        Add Publisher
      </Button>
      <Table>
      
        <TableHead>
        
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Establishment Year</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {publishers.length > 0 ? (
            publishers.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell>{publisher.name}</TableCell>
                <TableCell>{publisher.establishmentYear}</TableCell>
                <TableCell>{publisher.address}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(publisher)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(publisher.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography align="center">No publishers available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
   
    </TableContainer>
  );
};

export default PublisherTable;
