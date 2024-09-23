import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

const PublisherTable = ({ publishers, onEdit, onDelete, onAdd }) => {
  return (
    <TableContainer component={Paper}>
      {/* Add Publisher Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        sx={{ mt: 2, mb: 2 }} // Added spacing before and after the button
      >
        Add Publisher
      </Button>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell> {/* New ID column */}
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
                <TableCell>{publisher.id}</TableCell> {/* Displaying the ID */}
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
              <TableCell colSpan={5}> {/* Updated colSpan to match column count */}
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
