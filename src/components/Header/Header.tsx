import React from 'react';
import './Header.css';

export default function Header({
  children,
  shouldShowInterface,
}: {
  children?: React.ReactNode;
  shouldShowInterface: boolean;
}) {
  return (
    <header
      className={`c-header ${
        shouldShowInterface ? 'c-header--interface' : ''
      }`}
    >
      {children}
    </header>
  );
}
