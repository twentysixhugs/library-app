import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Book from './Book';
import './App.css';

interface Book {
  name: string;
  author: string;
  id: string;
}

function App() {
  const [library, setLibrary] = useState<Book[]>([
    { name: '123', author: '1233', id: '1' },
    { name: '321', author: '3211', id: '2' },
    { name: '555', author: '5555', id: '3' },
  ]);

  const handleDelete = useCallback(
    (id: string): React.MouseEventHandler<HTMLButtonElement> => {
      return () => {
        setLibrary(
          library.filter((book) => {
            if (book.id === id) {
              return false;
            }

            return true;
          }),
        );
      };
    },
    [library],
  );

  return (
    <div className="App">
      <div className="c-books">
        {library.map((book) => (
          <Book
            onDelete={handleDelete(book.id)}
            name={book.name}
            author={book.author}
            key={book.id}
          />
        ))}
      </div>
      <form className="c-form">
        <label htmlFor="name">Name</label>
        <input className="c-form__input" id="name" name="name"></input>
        <label htmlFor="author">Author</label>
        <input className="c-form__input" id="author" name="author"></input>
        <button className="c-form__submit">Add book</button>
      </form>
    </div>
  );
}

export default App;
