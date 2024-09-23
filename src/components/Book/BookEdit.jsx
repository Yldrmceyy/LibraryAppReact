// src/components/Book/BookEdit.js
import React from "react";
import BookForm from "./BookForm";

function BookEdit({ book, authors, publishers, categories, onChange, onSubmit }) {
  return (
    <BookForm
      book={book}
      authors={authors}
      publishers={publishers}
      categories={categories}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default BookEdit;
