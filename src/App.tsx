import React from 'react';
import Book from './components/Book';
import NewBookForm from './components/NewBookForm';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query } from 'firebase/firestore';

export interface IBook {
  name: string;
  author: string;
}

const app = initializeApp({
  apiKey: 'AIzaSyAzOSpDwCvzw3uV0DpdTzJUImXvfz2tp0M',
  authDomain: 'newlibrary-5811a.firebaseapp.com',
  projectId: 'newlibrary-5811a',
  storageBucket: 'newlibrary-5811a.appspot.com',
  messagingSenderId: '594803049014',
  appId: '1:594803049014:web:a0a59a8a8357a983e58e97',
});

export const db = getFirestore(app);

function App() {
  const booksQuery = query(collection(db, 'books'));
  const [booksSnapshot] = useCollection(booksQuery);

  const [isEditingAnyBook, setIsEditingAnyBook] = useState(false);

  const toggleBookEditMode = function () {
    setIsEditingAnyBook(!isEditingAnyBook);
  };

  return (
    <div className="App">
      <div className="c-library">
        {booksSnapshot &&
          booksSnapshot.docs.map((doc) => {
            const bookData = doc.data();
            return (
              <Book
                name={bookData.name}
                author={bookData.author}
                onEdit={toggleBookEditMode}
                key={doc.id}
                id={doc.id}
              />
            );
          })}
      </div>
      {isEditingAnyBook || <NewBookForm />}
    </div>
  );
}

export default App;
