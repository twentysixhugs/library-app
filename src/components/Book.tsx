import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useCallback } from 'react';
import { db } from '../App';
import { IBook } from '../App';

export default function Book({
  name,
  author,
  id,
  onEdit,
}: {
  name: string;
  author: string;
  id: string;
  onEdit: () => void;
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [inputOnEdit, setInputOnEdit] = useState<IBook>({ name, author });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    function (e) {
      setInputOnEdit({ ...inputOnEdit, [e.target.name]: e.target.value });
    };

  const handleEditSubmit =
    useCallback((): React.MouseEventHandler<HTMLButtonElement> => {
      return async () => {
        try {
          if (inputOnEdit.name === name && inputOnEdit.author === author) {
            // make sure we don't write to database
            // when both input fields are the same
            // as the previous name and author
            return;
          }

          const bookRef = doc(db, 'books', id);
          await updateDoc(bookRef, {
            name: inputOnEdit.name,
            author: inputOnEdit.author,
          });
        } catch (err) {
        } finally {
          toggleEditMode();
        }
      };
    }, [isEdited, inputOnEdit]);

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
        deleteDoc(doc(db, 'books', id));
      } catch (err) {
        console.log(err);
        alert('An error occured when deleting book');
      }
    };

  return (
    <div className="c-book">
      {isEdited ? (
        <div className="c-book__input-wrapper">
          <label htmlFor="name"></label>
          <input
            className="c-book__input"
            name="name"
            id="name"
            value={inputOnEdit.name}
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        <h2 className="c-book__name">{name}</h2>
      )}
      {isEdited ? (
        <div className="c-book__input-wrapper">
          <input
            className="c-book__input"
            name="author"
            id="author"
            value={inputOnEdit.author}
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        <span className="c-book__author">{author}</span>
      )}
      <button className="c-book__delete" onClick={handleDelete}>
        Delete
      </button>
      {isEdited ? (
        <button
          className="c-book__edit-submit"
          onClick={handleEditSubmit()}
        >
          Done
        </button>
      ) : (
        <button className="c-book__edit" onClick={() => toggleEditMode()}>
          Edit
        </button>
      )}
    </div>
  );
}