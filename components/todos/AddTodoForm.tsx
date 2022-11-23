import { FC, useState, useEffect } from "react"
import { FAddTodo } from "../../types"
import Alert from "../shared/Alert"

interface Props {
  addTodo: (todo: FAddTodo) => void
  closeAddTodo: () => void
}

const AddTodoForm: FC<Props> = ({ addTodo, closeAddTodo }) => {
  const [task, setTask] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!task) {
      setAlertMessage("You need to add some text!")
      setShowAlert(true)
      return
    }
    if (task.length > 32) {
      setAlertMessage("Your todo is too long!")
      setShowAlert(true)
      return
    }

    addTodo(task)
    setTask("")
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShowAlert(false)
    }, 3000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [showAlert])

  return (
    <div className="bg-gray-100 py-8 relative border-4 border-gray-100 rounded-lg dark:bg-slate-800 dark:border-slate-800">
      {showAlert && <Alert message={alertMessage} isError={false} />}
      <button
        onClick={closeAddTodo}
        className="cursor-pointer hover:translate-x-1 transition duration-150 relative bottom-8"
      >
        <div aria-label="close" className="flex flex-row-reverse">
          <span className="block h-6 w-12">close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="cross"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
      </button>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <label>adding a new todo...</label>
          <br />
          <input
            type="todo task"
            placeholder="todo task..."
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
            }}
            className="py-2 pl-8 pr-8 rounded text-2xl dark:bg-slate-900"
            autoFocus
          />
          <br />
          <button type="submit" className="mt-4 cursor-pointer">
            <span className="underline">add todo</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTodoForm
