import { FC, useEffect, useState } from "react";

interface Props {
  todo: any;
  handleOnEdit: (id: any, task: string) => void;
  stopEditing: () => void;
}

const EditTodoForm: FC<Props> = ({ todo, handleOnEdit, stopEditing }) => {
  const [newTask, setNewTask] = useState(todo.task);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleOnEdit(todo.id, newTask);
    stopEditing();
  };

  const handleSetTask = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="flex items-center my-2  border-4 border-gray-200 px-2 py-2 hover:bg-gray-50 transition duration-150 ease-out sm:px-6 dark:bg-slate-800 dark:border-slate-800 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:focus-within:bg-slate-800">
        <div className="ml-4 mr-8">
          <button
            onClick={stopEditing}
            className="my-4 hover:scale-150 duration-100 "
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-black dark:stroke-white hover:stroke-red-500 dark:hover:stroke-red-500 duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="min-w-0 flex-1 flex items-center w-full">
          <input
            className="text-lg leading-5 font-medium py-2 px-4 bg-transparent border-gray-200 focus:border-gray-400 focus:dark:border-orange-400 border-b-4 w-full focus:outline-none transition duration-150"
            type="task"
            autoFocus
            defaultValue={todo.task}
            onChange={(e) => {
              handleSetTask(e);
            }}
          />
        </div>
        <div className="ml-4 mr-8">
          <button
            className="w-8 h-8 ml-2 border-2 border-transparent hover:border-2 rounded transition duration-100 ease-out hover:scale-125"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTodoForm;
