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
    <Paper className="table-container">
      <Button variant="contained" color="primary" onClick={onAdd} style={{ marginBottom: '16px' }}>
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
              <TableCell>{author.id}</TableCell> {/* ID'yi burada ekliyoruz */}
              <TableCell component="th" scope="row">
                {author.name}
              </TableCell>
              <TableCell align="center">{author.birthDate}</TableCell>
              <TableCell align="center">{author.country}</TableCell>
              <TableCell align="center">
              
                <Button variant="outlined" onClick={() => onEdit(author)} style={{ marginRight: '10px' ,width:'2px' }}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => onDelete(author.id)} style={{ marginRight: '10px',width:'4px'  }}>
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
