import { FC, useState } from "react"
import Link from "next/link"
import { supabase } from "../../lib/supabaseClient"
import ResetPassword from "./ResetPassword"
import CheckEmail from "./CheckEmail"

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleIsEmailSent = async () => {
    setIsEmailSent(true)
  }

  const handleLoading = (bool: boolean) => {
    setLoading(bool)
  }

  return (
    <div className="mx-auto">
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
  )
}

export default ForgotPassword
