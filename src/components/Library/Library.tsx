import Book from '../Book/Book';
import BooksList from './BooksList/BooksList';

import { query, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../App';

export default function Library({
  onBookEdit,
  userId,
}: {
  onBookEdit: () => void;
  userId: string;
}) {
  const booksQuery = query(collection(db, userId));
  const [booksSnapshot, loading, error] = useCollection(booksQuery);

  return (
    <div className="c-library">
      {booksSnapshot && (
        <BooksList>
          {booksSnapshot.docs.map((doc) => {
            const bookData = doc.data();
            return (
              <Book
                name={bookData.name}
                author={bookData.author}
                onEdit={onBookEdit}
                key={doc.id}
                id={doc.id}
                userId={userId}
              />
            );
          })}
        </BooksList>
      )}
      {error && (
        <div className="c-library c-library--error">
          Something went wrong when reading data
        </div>
      )}
    </div>
  );
}
