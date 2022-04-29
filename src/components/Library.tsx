import Book from './Book';

import { query, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../App';

export default function Library({
  onBookEdit,
}: {
  onBookEdit: () => void;
}) {
  const booksQuery = query(collection(db, 'books'));
  const [booksSnapshot] = useCollection(booksQuery);
  return (
    <div className="c-library">
      {booksSnapshot &&
        booksSnapshot.docs.map((doc) => {
          const bookData = doc.data();
          return (
            <Book
              name={bookData.name}
              author={bookData.author}
              onEdit={onBookEdit}
              key={doc.id}
              id={doc.id}
            />
          );
        })}
    </div>
  );
}
