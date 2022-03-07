import React, { FC, useEffect, useState } from "react";
import TodoList from "../components/todos/TodoList";
import Auth from "../components/auth/Auth";
import { useTheme } from "next-themes";
import { supabase } from "../lib/supabaseClient";

const Todos: FC = () => {
  const [session, setSession] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return console.error(error.message);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {!session ? (
        <div>
          <Auth />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <header className="pt-20 pb-4">
            <button
              className="pt-2 pb-2 my-4"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <span className="mb-4">
                {theme === "light" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </span>
            </button>
            <h1 className="font-bold text-3xl">Nextjs Todolist</h1>
          </header>

          <TodoList user={supabase.auth.user()} />

          <button
            onClick={() => {
              handleSignOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Todos;
