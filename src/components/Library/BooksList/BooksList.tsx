import React from 'react';
import './BooksList.css';

export default function BooksList({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className="c-books-list">{children}</div>;
}
