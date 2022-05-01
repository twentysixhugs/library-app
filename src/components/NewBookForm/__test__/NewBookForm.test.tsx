import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBookForm from '../NewBookForm';

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  collection: jest.fn(),
  addDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

describe('Book add', () => {
  it('clears input fields when a new book is added', () => {
    render(<NewBookForm userId={'1'} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const authorInput = screen.getByLabelText(/name/i) as HTMLInputElement;

    userEvent.type(nameInput, 'test');
    userEvent.type(authorInput, 'test');

    userEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(nameInput.value).toBe('');
    expect(authorInput.value).toBe('');
  });
});
