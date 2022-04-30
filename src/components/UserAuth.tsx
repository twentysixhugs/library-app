import { Auth, User } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function UserAuth({
  user,
  auth,
}: {
  user: User | null;
  auth: Auth;
}) {
  const provider = new GoogleAuthProvider();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    function () {
      if (user) {
        auth.signOut();
      } else {
        signInWithPopup(auth, provider);
      }
    };
  return (
    <button onClick={handleClick} className="c-user-auth">
      {user ? 'Sign out' : 'Sign in'}
    </button>
  );
}
