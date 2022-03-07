import { FC, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface Props {
  handleIsEmailSent: () => void;
  handleLoading: (bool: boolean) => void;
  loading: boolean;
}

const ResetPassword: FC<Props> = ({
  handleIsEmailSent,
  handleLoading,
  loading,
}) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (emailParam: string) => {
    try {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        emailParam
      );
      handleLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      handleIsEmailSent();
      handleLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* {showAlert && <Alert message={alertMessage} isError={false} />} */}
      <div className="max-w-5xl mx-auto">
        <div className="pt-52 pb-10">
          <h1 className="text-3xl font-semibold">Forgot password.</h1>
          <p className="max-w-sm pt-2 text-gray-500 dark:text-gray-300">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        <form
          className="w-full"
          onSubmit={() => {
            handlePasswordReset(email);
          }}
        >
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

          <div className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePasswordReset(email);
              }}
              className="block w-full py-4 px-2 bg-slate-900 mt-2 mb-4 text-white font-medium rounded-lg hover:bg-slate-600 transition duration-150 ease-out"
              //   disabled={loading}
              type="submit"
            >
              <span>{loading ? "Loading" : "Send"}</span>
            </button>
          </div>
        </form>
        <br />
        <div className="flex justify-center pt-8">
          <button className="cursor-pointer">
            <div
              aria-label="close"
              className="flex flex-row-reverse relative bottom-8"
            >
              <Link href="/todos">
                <a>
                  <span className="block h-6 left-2 relative">
                    go back to sign in
                  </span>
                </a>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
