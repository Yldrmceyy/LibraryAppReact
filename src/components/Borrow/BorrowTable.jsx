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
      sx={{
        margin: "32px",
        display: "flex",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <div style={{ overflowX: "hidden" }}>
        <Table sx={{ tableLayout: "auto", width: "100%" }}>
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
                  sx={{ fontWeight: "bold" }}
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
                <TableCell align="center">
                  {record.book ? record.book.name : "N/A"}
                </TableCell>
                <TableCell align="center">
                  {record.book ? record.book.stock : "N/A"}
                </TableCell>
                <TableCell align="center">
                  {record.book && record.book.categories.length > 0 ? (
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
                <TableCell align="center">
                  {record.book ? record.book.author.name : "N/A"}
                </TableCell>
                <TableCell align="center">
                  {record.book ? record.book.publisher.name : "N/A"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#303f9f",
                      ":hover": {
                        backgroundColor: "#ffeb3b",
                        color: "#303f9f",
                      },
                      marginRight: 2,
                    }}
                    onClick={() => onEdit(record)}
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
