import React from 'react';

export default function BooksList({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className="c-books-list">{children}</div>;
}
