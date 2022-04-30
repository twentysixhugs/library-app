import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { User } from 'firebase/auth';

export function useAuth() {
  const auth = getAuth();

  const [authState, setAuthState] = useState<{
    user: null | User;
  }>({
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setAuthState({ user });
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [auth]);

  return { auth, ...authState };
}
