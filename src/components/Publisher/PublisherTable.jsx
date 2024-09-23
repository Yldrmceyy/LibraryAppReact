import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box } from '@mui/material';

const PublisherTable = ({ publishers, onEdit, onDelete, onAdd }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: 4 }}>
        {/* Add Publisher Button */}
        <Button
          variant="contained"
          onClick={onAdd}
          sx={{
            backgroundColor: '#303f9f',
            ':hover': { backgroundColor: '#ffeb3b', color: '#303f9f' },
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          Add Publisher
        </Button>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                  <TableCell>{publisher.id}</TableCell>
                  <TableCell>{publisher.name}</TableCell>
                  <TableCell>{publisher.establishmentYear}</TableCell>
                  <TableCell>{publisher.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => onEdit(publisher)}
                      sx={{
                        backgroundColor: '#303f9f',
                        ':hover': { backgroundColor: '#ffeb3b', color: '#303f9f' },
                        marginRight: 1,
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                      ":hover": {
                        backgroundColor: "#ffeb3b",
                        color: "#303f9f",
                      },
                      marginRight: "10px",
                    }}
                      onClick={() => onDelete(publisher.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center">No publishers available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PublisherTable;
