import React from "react"
import Link from "next/link"

const CheckEmail = () => {
  return (
    <div className="mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="pt-52 pb-10">
          <h1 className="text-3xl font-semibold">Forgot password.</h1>
          <p className="max-w-sm pt-2 text-gray-500 dark:text-gray-300">
            Email has been sent, Check your email!
            <br />
            Don't have an account?{" "}
            <a>
              <span className="underline">Sign Up</span>
            </a>
          </p>
        </div>

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
  )
}

export default CheckEmail
