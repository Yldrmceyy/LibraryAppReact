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
  Paper,
} from "@mui/material";

function BorrowTable({ borrowRecords, onEdit, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      style={{ margin: "32px", display: "flex", justifyContent: "center" }}
    >
      <div style={{ overflowX: "hidden" }}>
        <Table style={{ tableLayout: "auto", width: "100%" }}>
          <TableHead>
            <TableRow>
              {[
                "Borrower ID",
                "Borrower Name",
                "Borrower Email",
                "Borrowing Date",
                "Return Date",
                "Book Title",
                "Stock",
                "Categories",
                "Author Name",
                "Publisher",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  <TableSortLabel>{header}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell align="center">{record.id}</TableCell>
                <TableCell align="center">{record.borrowerName}</TableCell>
                <TableCell align="center">{record.borrowerMail}</TableCell>
                <TableCell align="center">
                  {new Date(record.borrowingDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(record.returnDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{record.book.name}</TableCell>
                <TableCell align="center">{record.book.stock}</TableCell>
                <TableCell align="center">
                  {record.book.categories.length > 0 ? (
                    record.book.categories.map((category, index) => (
                      <span key={index}>
                        {category.name}
                        {index < record.book.categories.length - 1 ? ", " : ""}
                      </span>
                    ))
                  ) : (
                    <span>No categories</span>
                  )}
                </TableCell>
                <TableCell align="center">{record.book.author.name}</TableCell>
                <TableCell align="center">
                  {record.book.publisher.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(record.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

export default BorrowTable;
