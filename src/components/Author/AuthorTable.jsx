import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function AuthorTable({ authors, onEdit, onDelete, onAssign, onAdd }) {
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
        Add New Author
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Author Name</TableCell>
            <TableCell align="center">Birth Date</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell component="th" scope="row">
                {author.name}
              </TableCell>
              <TableCell align="center">{author.birthDate}</TableCell>
              <TableCell align="center">{author.country}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#303f9f",
                    ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
                    marginRight: "10px",
                  }}
                  onClick={() => onEdit(author)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{

                    ":hover": { backgroundColor: "#ffeb3b", color: "#303f9f" },
                    marginRight: "10px",
                  }}
                  onClick={() => onDelete(author.id)}
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
