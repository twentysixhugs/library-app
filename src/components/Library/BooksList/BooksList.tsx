import React from 'react';
import './BooksList.css';

export default function BooksList({
  children,
}: {
  children?: React.ReactNode[];
}) {
  console.log(children);
  return (
    <div className="c-books-list">
      {children && children.length === 0 ? (
        <span>Start by adding some book</span>
      ) : (
        children
      )}
    </div>
  );
}
