import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Book from './Book';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

interface IBook {
  name: string;
  author: string;
}

const app = initializeApp({
  apiKey: 'AIzaSyAzOSpDwCvzw3uV0DpdTzJUImXvfz2tp0M',
  authDomain: 'newlibrary-5811a.firebaseapp.com',
  projectId: 'newlibrary-5811a',
  storageBucket: 'newlibrary-5811a.appspot.com',
  messagingSenderId: '594803049014',
  appId: '1:594803049014:web:a0a59a8a8357a983e58e97',
});

const db = getFirestore(app);

function App() {
  const [library, setLibrary] = useState<IBook[]>([]);

  const [newBookInput, setNewBookInput] = useState<IBook>({
    name: '',
    author: '',
  });

  //   const handleBookDelete = useCallback(
  //   (id: string): React.MouseEventHandler<HTMLButtonElement> => {
  //     return () => {
  //       setLibrary(
  //         library.filter((book) => {
  //           if (book.id === id) {
  //             return false;
  //           }

  //           return true;
  //         }),
  //       );
  //     };
  //   },
  //   [library],
  // );

  const handleBookAdd = useCallback(
    (
      bookName: string,
      bookAuthor: string,
    ): React.MouseEventHandler<HTMLButtonElement> => {
      return async (e) => {
        try {
          e.preventDefault();
          await addDoc(collection(db, 'books'), {
            name: bookName,
            author: bookAuthor,
          });
        } catch (err) {
          console.log(err);
        }
      };
    },
    [],
  );

  const handleNewBookInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    setNewBookInput({ ...newBookInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <div className="c-books">
        {library.map((book) => (
          <Book
            onDelete={() => {}}
            name={book.name}
            author={book.author}
          />
        ))}
      </div>
      <form className="c-form">
        <label htmlFor="name">Name</label>
        <input
          className="c-form__input"
          id="name"
          name="name"
          onChange={handleNewBookInputChange}
        ></input>
        <label htmlFor="author">Author</label>
        <input
          className="c-form__input"
          id="author"
          name="author"
          onChange={handleNewBookInputChange}
        ></input>
        <button
          className="c-form__submit"
          onClick={handleBookAdd(newBookInput.name, newBookInput.author)}
        >
          Add book
        </button>
      </form>
    </div>
  );
}

export default App;
