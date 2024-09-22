import React from "react";
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function BookBorrowForm({ borrowRequest, setBorrowRequest, onSubmit, handleBookSelect, books }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}  >
        {/* Borrow a Book */}
      </Typography>
      <form onSubmit={onSubmit} className="book-borrow-form">
        <Box mb={2}>
          <TextField
            label="Borrower Name"
            fullWidth
            value={borrowRequest.borrowerName}
            onChange={handleChange}
            name="borrowerName"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Borrower Email"
            fullWidth
            value={borrowRequest.borrowerMail}
            onChange={handleChange}
            name="borrowerMail"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Borrowing Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={borrowRequest.borrowingDate}
            onChange={handleChange}
            name="borrowingDate"
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth required>
            <InputLabel>Select Book</InputLabel>
            <Select
              value={borrowRequest.bookForBorrowingRequest.id || ""}
              onChange={(e) => handleBookSelect(e)}
              name="bookId"
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {`${book.name} (Stock: ${book.stock})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Button type="submit" fullWidth variant="contained">
            Borrow Book
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default BookBorrowForm;
