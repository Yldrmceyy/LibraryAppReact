import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function BookEditForm({ bookData, setBookData, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        Edit Book Details
      </Typography>
      <form onSubmit={onSubmit}>
        <Box mb={2}>
          <TextField
            label="Book Name"
            fullWidth
            value={bookData.name}
            onChange={handleChange}
            name="name"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Author"
            fullWidth
            value={bookData.author}
            onChange={handleChange}
            name="author"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Stock"
            fullWidth
            type="number"
            value={bookData.stock}
            onChange={handleChange}
            name="stock"
            required
          />
        </Box>
        <Box>
          <Button type="submit" fullWidth variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default BookEditForm;
