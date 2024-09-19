import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function CategoryForm({ category, onChange, onSubmit }) {
  return (
    <Box className="form-container">
      <Typography component="h1" variant="h5">
        Add New Category
      </Typography>
      <form onSubmit={onSubmit} className="category-form">
        <TextField
          label="Category Name"
          fullWidth
          value={category.name}
          onChange={(e) => onChange("name", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Category Description"
          fullWidth
          value={category.description}
          onChange={(e) => onChange("description", e.target.value)}
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Category
        </Button>
      </form>
    </Box>
  );
}

export default CategoryForm;
