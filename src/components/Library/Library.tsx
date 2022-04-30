import Book from '../Book/Book';

import { query, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../App';
import { User } from 'firebase/auth';

export default function Library({
  onBookEdit,
  user,
}: {
  onBookEdit: () => void;
  user: User;
}) {
  const booksQuery = query(collection(db, `${user.uid}`));
  const [booksSnapshot, loading, error] = useCollection(booksQuery);

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
              user={user}
            />
          );
        })}
      {error && (
        <div className="c-library c-library--error">
          Something went wrong when reading data
        </div>
      )}
    </div>
  );
}
