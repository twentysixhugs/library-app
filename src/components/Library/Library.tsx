import Book from '../Book/Book';
import BooksList from './BooksList/BooksList';

import { query, collection, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../App/App';

import './Library.css';

export default function Library({ userId }: { userId: string }) {
  const booksQuery = query(
    collection(db, userId),
    orderBy('timestamp', 'desc'),
  );

  //eslint-disable-next-line
  const [booksSnapshot, loading, error] = useCollection(booksQuery);

  return (
    <div className="c-library">
      {booksSnapshot && (
        <h1 className="c-library__heading">
          Your books<div className="c-library__heading-effect"></div>
        </h1>
      )}
      {booksSnapshot && (
        <BooksList>
          {booksSnapshot.docs.map((doc) => {
            const bookData = doc.data();
            return (
              <Book
                name={bookData.name}
                author={bookData.author}
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
