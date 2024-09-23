import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

function AuthorEdit({ author, onChange, onSubmit, error }) {
  return (
    <Box className="form-container" sx={{ padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography component="h1" variant="h5" sx={{ marginBottom: "1rem" }}>
        Update Author
      </Typography>
      <form onSubmit={onSubmit} className="author-form">
        <TextField
          label="Author Name"
          fullWidth
          value={author.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <TextField
          label="Birth Date"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={author.birthDate}
          onChange={(e) => onChange("birthDate", e.target.value)}
        />
        <TextField
          label="Country"
          fullWidth
          value={author.country}
          onChange={(e) => onChange("country", e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#303f9f",
            ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
            marginTop: "1rem",
          }}
        >
          Update Author
        </Button>
      </form>
    </Box>
  );
}

export default AuthorEdit;
