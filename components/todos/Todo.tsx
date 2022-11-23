import React, { FC, useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import EditTodoForm from "./EditTodoForm"

interface Props {
  todo: any
  onDelete: () => void
  handleOnEdit: (id: any, task: string) => void
}

const Todo: FC<Props> = ({ todo, onDelete, handleOnEdit }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .single()

      if (error) {
        throw new Error(error)
      }
      setIsCompleted(data.is_complete)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <li
      onClick={(e) => {
        e.preventDefault()
      }}
      className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      {!isEdit ? (
        <div className="flex items-center my-2  border-4 border-gray-200 px-2 py-2 hover:bg-gray-200 transition duration-150 ease-out sm:px-6 dark:bg-slate-900 dark:border-slate-900 dark:hover:bg-slate-700 dark:hover:border-slate-700">
          <div className="ml-4 mr-8">
            <input
              className="cursor-pointer h-4 w-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggle()}
              type="checkbox"
              checked={isCompleted}
            />
          </div>
          <div className="min-w-0 flex-1 flex items-center">
            <div
              className={`text-lg leading-5 font-medium ${
                isCompleted && "line-through"
              }`}
            >
              {todo.task}
            </div>
          </div>
          <button
            className="w-8 h-8 ml-2 border-2 border-transparent hover:border-2 rounded transition duration-100 ease-out hover:scale-150"
            onClick={() => {
              toggleEdit()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-label="pencil"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete()
            }}
            className="w-8 h-8 ml-2 border-2 border-transparent hover:border-2  rounded transition duration-100 ease-out hover:scale-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-black dark:stroke-white hover:stroke-red-500 dark:hover:stroke-red-500 duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-label="cross"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <EditTodoForm
          todo={todo}
          handleOnEdit={handleOnEdit}
          stopEditing={toggleEdit}
        />
      )}
    </li>
  )
}

export default Todo
