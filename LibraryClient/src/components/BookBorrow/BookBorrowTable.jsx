import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Paper
} from "@mui/material";

function BookBorrowTable({ borrowRecords, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel>Borrower ID</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Borrower Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Borrower Email</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Borrowing Date</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Return Date</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Book Title</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Stock</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Categories</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Author Name</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Publisher</TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel>Actions</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borrowRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.borrowerName}</TableCell>
              <TableCell>{record.borrowerMail}</TableCell>
              <TableCell>{new Date(record.borrowingDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(record.returnDate).toLocaleDateString()}</TableCell>
              <TableCell>{record.book.name}</TableCell>
              <TableCell>{record.book.stock}</TableCell>
              <TableCell>
                {record.book.categories.length > 0 ? (
                  record.book.categories.map((category, index) => (
                    <span key={index}>
                      {category.name}
                      {index < record.book.categories.length - 1 ? ', ' : ''}
                    </span>
                  ))
                ) : (
                  <span>No categories</span>
                )}
              </TableCell>
              <TableCell>{record.book.author.name}</TableCell>
              <TableCell>{record.book.publisher.name}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => onEdit(record.id)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(record.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookBorrowTable;
