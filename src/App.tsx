import NewBookForm from './components/NewBookForm/NewBookForm';
import Library from './components/Library/Library';
import UserAuth from './components/UserAuth/UserAuth';

import { useState } from 'react';
import { useAuth } from './hooks/useAuth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

import './App.css';
import Header from './components/Header/Header';

export interface IBook {
  name: string;
  author: string;
}

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAzOSpDwCvzw3uV0DpdTzJUImXvfz2tp0M',
  authDomain: 'newlibrary-5811a.firebaseapp.com',
  projectId: 'newlibrary-5811a',
  storageBucket: 'newlibrary-5811a.appspot.com',
  messagingSenderId: '594803049014',
  appId: '1:594803049014:web:a0a59a8a8357a983e58e97',
});

export const db = getFirestore(firebaseApp);

function App() {
  const [isEditingAnyBook, setIsEditingAnyBook] = useState(false);
  const { user, auth } = useAuth();

  const toggleBookEditMode = function () {
    setIsEditingAnyBook(!isEditingAnyBook);
  };

  return (
    <div className="App">
      {!!user ? (
        <>
          <Header>
            {isEditingAnyBook || <NewBookForm userId={user.uid} />}
            <UserAuth auth={auth} user={user} />
          </Header>
          <div className="wrapper wrapper--app">
            <Library userId={user.uid} onBookEdit={toggleBookEditMode} />
          </div>
        </>
      ) : (
        <>
          <Header>Welcome!</Header>
          <div className="wrapper wrapper--app">
            <UserAuth auth={auth} user={user} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
