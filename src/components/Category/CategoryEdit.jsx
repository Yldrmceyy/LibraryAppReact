import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function CategoryEdit({ category, onChange, onSubmit }) {
  return (
    <Box className="form-container">
      <Typography component="h1" variant="h5">
        Update Category
      </Typography>
      <form onSubmit={onSubmit} className="category-form">
        <TextField
          label="Category Name"
          fullWidth
          value={category.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={category.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained">
          Update Category
        </Button>
      </form>
    </Box>
  );
}

export default CategoryEdit;
