import { Auth, User } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
      <button onClick={handleClick} className="c-user-auth">
        {user ? 'Sign out' : 'Sign in'}
      </button>
      {shouldRenderUserInfo && (
        <div className="c-user-auth__user-info">
          {auth.currentUser && auth.currentUser.displayName}
          {auth.currentUser && (
            <img
              className="c-user-auth__profile-pic"
              src={auth.currentUser.photoURL || ''}
              alt="avatar"
            ></img>
          )}
        </div>
      )}
    </div>
  );
}
