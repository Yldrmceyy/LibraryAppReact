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
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "borrowingDate") {
      const borrowingDate = new Date(value);
      const returnDate = new Date(borrowingDate);
      returnDate.setDate(returnDate.getDate() + 30); // Auto-set return date to 30 days later
      
      setBorrowRequest((prevRequest) => ({
        ...prevRequest,
        borrowingDate: value, // Update borrowingDate with selected date
        returnDate: prevRequest.returnDate || returnDate.toISOString().split('T')[0], // Only auto-set if returnDate is empty
      }));
    } else if (name === "returnDate") {
      setBorrowRequest((prevRequest) => ({
        ...prevRequest,
        returnDate: value, // Allow user to manually change return date
      }));
    } else {
      setBorrowRequest((prevRequest) => ({
        ...prevRequest,
        [name]: value,
      }));
    }
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 500, margin: "0 auto" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Edit Borrow Request
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
          <TextField
            label="Return Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={borrowRequest.returnDate} // Editable return date
            onChange={handleChange}
            name="returnDate"
            required
          />
        </Box>

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
