import React from 'react';

export default function BookButtons({
  onEdit,
  onDelete,
  onEditDone,
  isEdited,
}: {
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  onEditDone: React.MouseEventHandler<HTMLButtonElement>;
  isEdited: boolean;
}) {
  return (
    <div className="c-book-buttons">
      {isEdited ? (
        <button
          className="c-book-buttons__btn c-book-buttons__btn--submit"
          onClick={onEditDone}
          aria-label="done editing and submit"
        >
          Done
        </button>
      ) : (
        <button
          className="c-book-buttons__btn c-book-buttons__btn--edit"
          onClick={onEdit}
          aria-label="edit book"
        >
          Edit
        </button>
      )}
      <button
        className="c-book-buttons__btn c-book-buttons__btn--delete"
        onClick={onDelete}
        aria-label="delete book"
      >
        Delete
      </button>
    </div>
  );
}
