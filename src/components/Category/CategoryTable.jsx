import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from "@mui/material";

const CategoryTable = ({ categories, onEdit, onDelete, onAdd }) => {
  return (
    <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      {/* Add Category Button */}
      <Button
        variant="contained"
        onClick={onAdd}
        sx={{
          backgroundColor: "#303f9f",
          ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        Add Category
      </Button>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => onEdit(category)}
                    sx={{
                      backgroundColor: "#303f9f",
                      ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
                      marginRight: 1,
                    }}
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
                    onClick={() => onDelete(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography align="center">No categories available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
