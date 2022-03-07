import { useState, useEffect, FC } from "react";
import { supabase } from "../../lib/supabaseClient";
import Alert from "../shared/Alert";
import Link from "next/link";

interface Props {
  handleAuthChange: (bool: boolean) => void;
}

const Login: FC<Props> = ({ handleAuthChange }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      setLoading(false);
      setAlertMessage(error.error_description || error.message);
      setShowAlert(true);
      console.error(error.error_description || error.message);
    }
  };

  const handleGithubLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [showAlert]);

  return (
    <div className="mx-auto">
      {showAlert && <Alert message={alertMessage} isError={false} />}
      <div className="max-w-5xl mx-auto">
        <div className="pt-52 pb-10">
          <h1 className="text-3xl font-semibold">Log in.</h1>
          <p className="max-w-sm pt-2 text-gray-500 dark:text-gray-300">
            Keep track of everything you need with Todoolist.
            <br />
            Don't have an account?{" "}
            <a
              onClick={() => {
                handleAuthChange(true);
              }}
              className="cursor-pointer hover:text-gray-900 transition duration-150 ease-out dark:hover:text-white"
            >
              <span className="underline">Sign Up</span>
            </a>
          </p>
        </div>
        <form className="w-full">
          <div className="pb-2">
            <label className="text-gray-500 dark:text-gray-200 focus:text-black">
              Email
            </label>
            <br />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-96 my-1 py-2 px-2 border-2 border-gray-200 bg-white rounded-lg dark:text-black"
            />
          </div>
          <div className="">
            <label className="text-gray-500 dark:text-gray-200">Password</label>
            <br />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-96 my-1 py-2 px-2 border-2 border-gray-200 bg-white rounded-lg dark:text-black"
            />
          </div>

          <div className="w-full flex justify-between my-2 text-gray-500 dark:text-gray-200 ">
            <span>
              <input className="cursor-pointer h-4 w-4 mr-2" type="checkbox" />
              Remember this device?
            </span>
            <span>
              <Link href="/forgot">
                <a className="cursor-pointer hover:text-gray-900 transition duration-150 ease-out dark:hover:text-white">
                  Forgot password?
                </a>
              </Link>
            </span>
          </div>

          <div className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEmailLogin(email, password);
              }}
              className="block w-full py-4 px-2 bg-slate-900 mt-8 mb-4 text-white font-medium rounded-lg hover:bg-slate-600 transition duration-150 ease-out"
              disabled={loading}
            >
              <span>{loading ? "Loading..." : "Log In"}</span>
            </button>
          </div>
        </form>
        <br />
        <div className="flex justify-between pt-4">
          <span className="h-1 w-4/12 bg-gray-200 dark:bg-gray-400"></span>
          <span className="relative bottom-3 text-gray-500 dark:text-gray-300">
            or sign in with
          </span>
          <span className="h-1 w-4/12 bg-gray-200 dark:bg-gray-400"></span>
        </div>
        <div className="w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGithubLogin();
            }}
            className="flex w-full justify-center py-4 px-2 bg-gray-100 border-4 border-gray-100 mt-8 mb-4 text-black font-medium rounded-lg dark:border-gray-100 dark:hover:border-gray-200 transition duration-150 ease-out hover:bg-gray-200 hover:border-gray-200"
            disabled={loading}
            type="button"
          >
            <span className="block">
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="text-black mr-2 transform"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                ></path>
              </svg>
            </span>
            <span className="block">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
