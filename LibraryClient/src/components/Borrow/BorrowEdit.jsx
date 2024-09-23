import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function BorrowEdit({
  borrowRequest,
  setBorrowRequest,
  onSubmit,
  handleBookSelect,
  books,
}) {
  // Handle change in text fields (name, email, borrowing date, return date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Edit Borrow Request
      </Typography>
      <form onSubmit={onSubmit} className="book-borrow-form">
        {/* Borrower Name */}
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

        {/* Borrower Email */}
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

        {/* Borrowing Date */}
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

        {/* Return Date */}
        <Box mb={2}>
          <TextField
            label="Return Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={borrowRequest.returnDate} // Handle return date
            onChange={handleChange}
            name="returnDate"
            required
          />
        </Box>

        {/* Book Select */}
        <Box mb={2}>
          <FormControl fullWidth required>
            <InputLabel>Select Book</InputLabel>
            <Select
              value={borrowRequest.bookForBorrowingRequest.id || ""} // Ensure the value is set correctly
              onChange={handleBookSelect} // Calls parent handler to update the book in state
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

        {/* Submit Button */}
        <Box>
          <Button type="submit" fullWidth variant="contained">
            Update Borrow Request
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default BorrowEdit;
