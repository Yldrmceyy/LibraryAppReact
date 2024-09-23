import React from "react";
import { TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

function BookForm({ book, authors, publishers, categories, onChange, onSubmit, error }) {
  return (
    <Box className="form-container" sx={{ padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: "2", color: "#303f9f" }}>
        {book.id ? "Edit Book" : "Add Book"}
      </Typography>
      <form onSubmit={onSubmit} className="book-form">
        <TextField
          label="Book Title"
          fullWidth
          value={book.name}
          onChange={(e) => onChange("name", e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Publication Year"
          fullWidth
          type="number"
          value={book.publicationYear}
          onChange={(e) => onChange("publicationYear", e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Stock"
          fullWidth
          type="number"
          value={book.stock}
          onChange={(e) => onChange("stock", e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Author</InputLabel>
          <Select
            value={book.author?.id || ""}
            onChange={(e) => onChange("author", { id: e.target.value })}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Publisher</InputLabel>
          <Select
            value={book.publisher?.id || ""}
            onChange={(e) => onChange("publisher", { id: e.target.value })}
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <InputLabel>Categories</InputLabel>
          <Select
            value={book.categories.map(category => category.id) || []}
            multiple
            onChange={(e) => onChange("categories", e.target.value.map(id => ({ id })))}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#303f9f",
            ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
          }}
        >
          {book.id ? "Update Book" : "Add Book"}
        </Button>
      </form>
    </Box>
  );
}

export default BookForm;
