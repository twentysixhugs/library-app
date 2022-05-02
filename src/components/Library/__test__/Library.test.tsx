import { screen, render } from '@testing-library/react';
import Library from '../Library';

const mockBooksSnapshot = {
  docs: [
    {
      data: () => ({ name: 'book 1', author: 'author 1' }),
      id: '1',
    },
    {
      data: () => ({ name: 'book 2', author: 'author 2' }),
      id: '2',
    },
    {
      data: () => ({ name: 'book 3', author: 'author 3' }),
      id: '3',
    },
  ],
};

jest.mock('react-firebase-hooks/firestore', () => ({
  __esModule: true,
  useCollection: jest.fn().mockImplementation(() => {
    return [mockBooksSnapshot, false, undefined];
  }),
}));

describe('Books quantity', () => {
  it('Shows books from books snapshot', () => {
    render(<Library onBookEdit={jest.fn()} userId={'1'} />);

    const nodes = screen.getAllByText(/book/i);

    nodes.forEach((node) => {
      expect(node).toBeInTheDocument();
    });

    expect(nodes.length).toBe(mockBooksSnapshot.docs.length);
  });
});
