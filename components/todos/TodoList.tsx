import { FC, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AddTodoForm from "./AddTodoForm";
import Alert from "./Alert";
import Todo from "./Todo";
import { ITodo } from "../../types/index";

interface Props {
  user: any;
}

const Todolist: FC<Props> = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [errorText, setError] = useState("");
  const [isLocal, setIsLocal] = useState(false);
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      let { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("id", true);
      if (error) throw new Error(errorText);
      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (todoId: string | number, task: string) => {
    try {
      let trimmedTask = task.trim();
      const { data, error } = await supabase
        .from("todos")
        .update({ task: trimmedTask })
        .eq("id", todoId)
        .single();

      let newList = todos.map((storedTodo: ITodo) => {
        if (storedTodo.id == todoId) return Object.assign({}, data);
        return storedTodo;
      });
      if (error) {
        throw new Error(error);
      }
      setTodos(newList);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (task: string) => {
    let trimmedTask = task.trim();
    if (trimmedTask.length) {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task: trimmedTask, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else {
        setTodos([...todos, todo]);
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      const filteredTodos = todos.filter((todo) => todo.id != id);
      setTodos(filteredTodos);
    } catch (error) {
      console.log("error", error);
    }
  };

  const closeAddTodo = () => {
    setIsAddTodoOpen(false);
  };

  return (
    <div className="py-8">
      <div>
        {!isAddTodoOpen ? (
          <button
            onClick={() => {
              setIsAddTodoOpen(true);
            }}
            className="cursor-pointer hover:translate-x-1 transition duration-150"
          >
            <div className="flex">
              <span className="pr-2">
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>add a task</span>
            </div>
          </button>
        ) : (
          <AddTodoForm addTodo={addTodo} closeAddTodo={closeAddTodo} />
        )}
      </div>

      {/* {!!errorText && <Alert text={errorText} />} */}

      <div className="pt-14">
        <h3 className="text-xl font-bold ">todos - {todos.length}</h3>
        <ul className="py-4">
          {!todos.length && (
            <h3 className="text-lg text-gray-400 font-light pt-8">
              There's no todos, add some!
            </h3>
          )}
          {todos.map((todo: ITodo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              handleOnEdit={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
