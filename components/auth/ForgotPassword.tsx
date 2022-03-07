import { FC, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import ResetPassword from "./ResetPassword";
import CheckEmail from "./CheckEmail";

const ForgotPassword: FC = () => {
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleIsEmailSent = async () => {
    setIsEmailSent(true);
  };

  const handleLoading = (bool: boolean) => {
    setLoading(bool);
  };

  // const handlePasswordReset = async (emailParam: string) => {
  //   try {
  //     const { data, error } =
  //       supabase.auth.api.resetPasswordForEmail(emailParam);
  //     setLoading(true);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //     console.log("WORKING?");
  //   }
  // };

  return (
    <div className="mx-auto">
      {/* {showAlert && <Alert message={alertMessage} isError={false} />} */}
      {!isEmailSent ? (
        <ResetPassword
          handleIsEmailSent={handleIsEmailSent}
          handleLoading={handleLoading}
          loading={loading}
        />
      ) : (
        <CheckEmail />
      )}
    </div>
  );
};

export default ForgotPassword;
