import React from 'react';

export default function Header({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <header className="c-header">{children}</header>;
}
