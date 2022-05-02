import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Book from '../Book';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { waitForElementToBeRemoved } from '@testing-library/react';

describe('Book name and author', () => {
  const onEdit = jest.fn(); /* Mock app's response to book edit */
  const mockString = '1';
  it('should render name', () => {
    render(
      <Book
        name={'testname'}
        author={mockString}
        id={mockString}
        userId={mockString}
      />,
    );

    expect(screen.getByText('testname')).toBeInTheDocument();
  });

  it('should render author', () => {
    render(
      <Book
        name={mockString}
        author={'testauthor'}
        id={mockString}
        userId={mockString}
      />,
    );

    expect(screen.getByText('testauthor')).toBeInTheDocument();
  });

  it('should show input fields with name and author when starting to edit the book', () => {
    const name = 'testname';
    const author = 'testauthor';
    render(
      <Book
        name={name}
        author={author}
        id={mockString}
        userId={mockString}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /edit/i }));

    const nameInput = screen.getByLabelText(/name/i, { exact: true });
    const authorInput = screen.getByLabelText(/author/i, { exact: false });

    expect(nameInput).toHaveValue(name);
    expect(authorInput).toHaveValue(author);
  });
});

describe('Book data manipulation calls', () => {
  const mockString = '1';

  it('should call book deletion in API', () => {
    render(
      <Book
        name={'testname'}
        author={mockString}
        id={mockString}
        userId={mockString}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteDoc).toHaveBeenCalled();
  });

  it('should call book update in API', async () => {
    render(
      <Book
        name={'testname'}
        author={mockString}
        id={mockString}
        userId={mockString}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /edit/i }));
    userEvent.type(screen.getByLabelText(/name/i), 'test');
    userEvent.click(screen.getByRole('button', { name: /done/i }));

    expect(updateDoc).toHaveBeenCalled();
    await waitForElementToBeRemoved(() =>
      screen.queryByLabelText(/name/i),
    );
  });

  it('should hide input controls after editing', async () => {
    render(
      <Book
        name={'testname'}
        author={mockString}
        id={mockString}
        userId={mockString}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /edit/i }));
    const input = screen.getByLabelText(/name/i);
    userEvent.type(input, 'test');
    userEvent.click(screen.getByRole('button', { name: /done/i }));

    await waitForElementToBeRemoved(() =>
      screen.queryByLabelText(/name/i),
    );

    expect(input).not.toBeInTheDocument();
  });
});
