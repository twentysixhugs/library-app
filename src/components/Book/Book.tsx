import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../App/App';
import { IBook } from '../App/App';

export default function Book({
  name,
  author,
  id,
  userId,
  onEdit,
}: {
  name: string;
  author: string;
  id: string;
  userId: string;
  onEdit: () => void;
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [inputOnEdit, setInputOnEdit] = useState<IBook>({ name, author });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    function (e) {
      setInputOnEdit({ ...inputOnEdit, [e.target.name]: e.target.value });
    };

  const handleEditSubmit: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      if (inputOnEdit.name === name && inputOnEdit.author === author) {
        // make sure we don't write to database
        // when both input fields are the same
        // as the previous name and author
        return;
      }

      const bookRef = doc(db, userId, id);
      await updateDoc(bookRef, {
        name: inputOnEdit.name,
        author: inputOnEdit.author,
      });
    } catch (err) {
      alert('An error occured when editing the book');
      setInputOnEdit({ name, author });
    } finally {
      toggleEditMode();
    }
  };

  const toggleEditMode = function () {
    onEdit(); // signal to app's ui that edit mode has been toggled
    setIsEdited(!isEdited);
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> =
    async function () {
      if (isEdited) {
        /* Make sure the app will not remain in edit mode 
        if the book is suddenly deleted by the user */
        toggleEditMode();
      }

      try {
        await deleteDoc(doc(db, userId, id));
      } catch (err) {
        console.log(err);
        alert('An error occured when deleting the book');
      }
    };

  return (
    <div className="c-book">
      {isEdited ? (
        <div className="c-book__input-wrapper">
          <label id="name-label" htmlFor="name">
            Name:{' '}
          </label>
          <input
            className="c-book__input"
            name="name"
            id="name"
            value={inputOnEdit.name}
            onChange={handleChange}
            aria-labelledby="name-label"
          ></input>
        </div>
      ) : (
        <h2 className="c-book__name">{name}</h2>
      )}
      {isEdited ? (
        <div className="c-book__input-wrapper">
          <label id="author-label" htmlFor="author">
            Author:{' '}
          </label>
          <input
            className="c-book__input"
            name="author"
            id="author"
            value={inputOnEdit.author}
            onChange={handleChange}
            aria-labelledby="author-label"
          ></input>
        </div>
      ) : (
        <span className="c-book__author">{author}</span>
      )}
      <button
        className="c-book__delete"
        onClick={handleDelete}
        aria-label="delete book"
      >
        Delete
      </button>
      {isEdited ? (
        <button
          className="c-book__edit-submit"
          onClick={handleEditSubmit}
          aria-label="finish editing and submit"
        >
          Done
        </button>
      ) : (
        <button
          className="c-book__edit"
          onClick={() => toggleEditMode()}
          aria-label="edit book"
        >
          Edit
        </button>
      )}
    </div>
  );
}
