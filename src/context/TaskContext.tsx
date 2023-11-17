import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import { TaskSchema } from "../schema/Task";

interface Props {
  children: ReactNode;
}

interface ITaskContext {
  toDoTasks: Array<TaskSchema>;
  inProgressTasks: Array<TaskSchema>;
  completedTasks: Array<TaskSchema>;
  setTodoTasks: Dispatch<SetStateAction<Array<TaskSchema>>>;
  setInProgressTasks: Dispatch<SetStateAction<Array<TaskSchema>>>;
  setCompletedTasks: Dispatch<SetStateAction<Array<TaskSchema>>>;
  getTasks: (status: string) => {
    tasks: Array<TaskSchema>;
    handleTasks: Dispatch<SetStateAction<Array<TaskSchema>>>;
  };
}
export const TaskContext = createContext<ITaskContext>({
  toDoTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  setTodoTasks: () => {},
  setInProgressTasks: () => {},
  setCompletedTasks: () => {},
  getTasks: () => ({ tasks: [], handleTasks: () => {} }),
});

export const TaskProvider: FC<Props> = ({ children }) => {
  const [toDoTasks, setTodoTasks] = useState<Array<TaskSchema>>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Array<TaskSchema>>([]);
  const [completedTasks, setCompletedTasks] = useState<Array<TaskSchema>>([]);

  const getTasks = useCallback((status: string) => {
    let data: {
      tasks: Array<TaskSchema>;
      handleTasks: Dispatch<SetStateAction<Array<TaskSchema>>>;
    } = {
      tasks: [],
      handleTasks: () => {},
    };
    status === "To do"
      ? (data = { tasks: toDoTasks, handleTasks: setTodoTasks })
      : status === "In progress"
      ? (data = { tasks: inProgressTasks, handleTasks: setInProgressTasks })
      : (data = { tasks: completedTasks, handleTasks: setCompletedTasks });
    return data;
  }, [toDoTasks, inProgressTasks, completedTasks]);

  return (
    <TaskContext.Provider
      value={{
        toDoTasks,
        inProgressTasks,
        completedTasks,
        setTodoTasks,
        setInProgressTasks,
        setCompletedTasks,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
