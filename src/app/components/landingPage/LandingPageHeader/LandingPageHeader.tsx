import { useAtom } from 'jotai';
import authAtom from '<root>/app/atom/authAtom';
import Image from 'next/image';
import RadixButton from '../../ui/RadixButton/RadixButton';

interface LandingPageHeaderProps {
  handleLoginClick: () => void;
}

function LandingPageHeader({ handleLoginClick }: LandingPageHeaderProps) {
  const [user, setUser] = useAtom(authAtom);

  const handleLogOut = () => {
    setUser(null);
  };

  const isUserLoggedIn = !!user;

  return (
    <header className="flex justify-between pt-5 mb-5 px-8">
      <Image
        alt="Image"
        src="https://firebasestorage.googleapis.com/v0/b/menu-78763.appspot.com/o/images%2Ftriangle-geometric-logo_611716-97.jpg?alt=media&token=635eb621-b2bc-48eb-9895-00e7b99c5c59"
        width={48}
        height={48}
      />

      <span className="flex gap-4">
        {isUserLoggedIn ? (
          <RadixButton onClick={handleLogOut}>Log out</RadixButton>
        ) : (
          <>
            <RadixButton onClick={handleLoginClick}>LOGIN</RadixButton>
            <RadixButton>Sign Up</RadixButton>
          </>
        )}
      </span>
    </header>
  );
}

export default LandingPageHeader;
