import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
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
}
export const TaskContext = createContext<ITaskContext>({
  toDoTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  setTodoTasks: () => {},
  setInProgressTasks: () => {},
  setCompletedTasks: () => {},
});

export const TaskProvider: FC<Props> = ({ children }) => {
  const [toDoTasks, setTodoTasks] = useState<Array<TaskSchema>>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Array<TaskSchema>>([]);
  const [completedTasks, setCompletedTasks] = useState<Array<TaskSchema>>([]);
  return (
    <TaskContext.Provider
      value={{
        toDoTasks,
        inProgressTasks,
        completedTasks,
        setTodoTasks,
        setInProgressTasks,
        setCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
