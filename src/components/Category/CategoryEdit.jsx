import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function CategoryEdit({ category, onChange, onSubmit }) {
  return (
    <Box
      className="form-container"
      sx={{ maxWidth: 500, margin: "0 auto", padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px", marginBottom: 2 }} 
    >
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2, color: "#303f9f" }}>
        Update Category
      </Typography>
      <form onSubmit={onSubmit} className="category-form">
        <TextField
          label="Category Name"
          fullWidth
          value={category.name}
          onChange={(e) => onChange("name", e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          value={category.description}
          onChange={(e) => onChange("description", e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#303f9f",
            ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
          }}
        >
          Update Category
        </Button>
      </form>
    </Box>
  );
}

export default CategoryEdit;
