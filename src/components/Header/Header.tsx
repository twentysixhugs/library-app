import React from 'react';
import './Header.css';

export default function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <header className="c-header">{children}</header>;
}
