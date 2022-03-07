import React, { FC } from "react";

interface Props {
  message: string;
  isError: boolean;
}

const Alert: FC<Props> = ({ message, isError }) => {
  return (
    <div
      className={`bg-red-500 absolute w-96 left-0 right-0 ml-auto mr-auto top-60 rounded py-10 z-20 shadow-sm transition duration-150 animate-fade`}
    >
      <div className="py-4 px-20">
        <span className="block bottom-2 relative">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span>
          <span className="text-xl font-semibold">
            {isError ? "An error has occured!" : "Uh oh, there was an issue."}
          </span>
          <span>
            <p>{message}</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Alert;
