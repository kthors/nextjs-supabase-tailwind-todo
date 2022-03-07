import { FC, useState } from "react";
import Alert from "../shared/Alert";
import Login from "./Login";
import Signup from "./Signup";

const Auth: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuthChange = (bool: boolean) => {
    setIsSignUp(bool);
  };

  return (
    <div className="row flex flex-center w-full bg-white dark:bg-slate-800 relative">
      {!isSignUp ? (
        <Login handleAuthChange={handleAuthChange} />
      ) : (
        <Signup handleAuthChange={handleAuthChange} />
      )}
    </div>
  );
};

export default Auth;
