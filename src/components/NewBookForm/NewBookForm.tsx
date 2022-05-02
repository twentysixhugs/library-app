import React from 'react';
import { useState, useCallback } from 'react';
import { IBook } from '../App/App';
import { db } from '../App/App';
import { addDoc, collection } from 'firebase/firestore';
import './NewBookForm.css';

export default function NewBookForm({ userId }: { userId: string }) {
  const [newBookInput, setNewBookInput] = useState<IBook>({
    name: '',
    author: '',
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setNewBookInput({ ...newBookInput, [e.target.name]: e.target.value });
  };

  const handleBookAdd = useCallback(
    (
      bookName: string,
      bookAuthor: string,
    ): React.MouseEventHandler<HTMLButtonElement> => {
      return async (e) => {
        setNewBookInput({ name: '', author: '' });

        try {
          e.preventDefault();
          await addDoc(collection(db, userId), {
            name: bookName,
            author: bookAuthor,
          });
        } catch (err) {
          console.log(err);
          alert('An error occured when adding book');
        }
      };
    },
    [userId],
  );

  return (
    <form className="c-form">
      <h1 className="c-form__heading">New book</h1>
      <label
        className="c-form__label"
        id="c-form__name-label"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="c-form__input"
        id="name"
        name="name"
        value={newBookInput.name}
        onChange={handleInputChange}
        aria-labelledby="c-form__name-label"
        autoComplete="off"
      ></input>
      <label
        className="c-form__label"
        id="c-form__author-label"
        htmlFor="author"
      >
        Author
      </label>
      <input
        className="c-form__input"
        id="author"
        name="author"
        value={newBookInput.author}
        onChange={handleInputChange}
        aria-labelledby="c-form__author-label"
        autoComplete="off"
      ></input>
      <div className="wrapper wrapper--add-book">
        <button
          className="c-form__submit"
          onClick={handleBookAdd(newBookInput.name, newBookInput.author)}
          aria-label="add book to library"
        >
          Add
        </button>
      </div>
    </form>
  );
}
