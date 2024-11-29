import { useAtom } from "jotai";
import RadixButton from "../../ui/RadixButton/RadixButton";
import { authAtom } from "<root>/app/atom/authAtom";

interface landingPageHeaderProps {
  handleLoginClick: () => void;
}

const LandingPageHeader = ({ handleLoginClick }: landingPageHeaderProps) => {
  const [user, setUser] = useAtom(authAtom);

  const handleLogOut = () => {
    setUser(null);
  };

  const isUserLoggedIn = !!user;

  return (
    <header className="flex justify-between pt-5 mb-5">
      <img
        className="w-12"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png"
      />

      <span className="flex gap-4">
        {isUserLoggedIn ? (
          <>
            <RadixButton onClick={handleLogOut}>Log out</RadixButton>
          </>
        ) : (
          <>
            <RadixButton onClick={handleLoginClick}>LOGIN</RadixButton>
            <RadixButton>Sign Up</RadixButton>
          </>
        )}
      </span>
    </header>
  );
};

export default LandingPageHeader;
