import NewBookForm from '../NewBookForm/NewBookForm';
import Library from '../Library/Library';
import UserAuth from '../UserAuth/UserAuth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';
import Header from '../Header/Header';
import { getAuth } from 'firebase/auth';

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

const auth = getAuth();

function App() {
  //eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      {!!user ? (
        <>
          <Header shouldShowInterface={true}>
            <NewBookForm userId={user.uid} />
            <UserAuth
              auth={auth}
              user={user}
              shouldRenderUserInfo={true}
            />
          </Header>
          <div className="wrapper wrapper--app">
            <Library userId={user.uid} />
          </div>
        </>
      ) : (
        <>
          <Header shouldShowInterface={false}>
            <span className="c-header__welcome">
              {loading
                ? 'Loading...'
                : 'Welcome! Please, sign in to start working with the library'}
            </span>
          </Header>
          <div className="wrapper wrapper--app">
            {!loading && (
              <UserAuth
                auth={auth}
                user={user}
                shouldRenderUserInfo={false}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
