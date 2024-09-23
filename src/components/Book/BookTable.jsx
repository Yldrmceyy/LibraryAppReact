import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function BookTable({ books, authors, publishers, categories, onEdit, onDelete, onAdd }) {
  return (
    <Paper className="table-container" sx={{ padding: "2rem", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <Button
        variant="contained"
        onClick={onAdd}
        sx={{
          backgroundColor: "#303f9f",
          ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
          marginBottom: "16px",
        }}
      >
        Add New Book
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Publication Year</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>
                {authors.find((author) => author.id === book.author.id)?.name}
              </TableCell>
              <TableCell>
                {
                  publishers.find(
                    (publisher) => publisher.id === book.publisher.id
                  )?.name
                }
              </TableCell>
              <TableCell>
                {book.categories
                  .map((cat) => categories.find((c) => c.id === cat.id)?.name)
                  .join(", ")}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#303f9f",
                    ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
                    marginRight: "10px",
                  }}
                  onClick={() => onEdit(book)}
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
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
