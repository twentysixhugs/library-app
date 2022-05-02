import { Auth, User } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './UserAuth.css';

export default function UserAuth({
  user,
  auth,
  shouldRenderUserInfo,
}: {
  user: User | null;
  auth: Auth;
  shouldRenderUserInfo: boolean;
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
    <div className="c-user-auth">
      {shouldRenderUserInfo && (
        <div className="c-user-auth__user-info">
          <span>{auth.currentUser && auth.currentUser.displayName}</span>
          {auth.currentUser && (
            <img
              className="c-user-auth__profile-pic"
              src={auth.currentUser.photoURL || ''}
              alt="avatar"
            ></img>
          )}
        </div>
      )}
      <button onClick={handleClick} className="c-user-auth__button">
        {user ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
}
