import { TaskSchema } from "../schema/Task";
import { protectedAxios } from "./axios";

export interface ITaskRequest {
  title: string;
  description: string;
  priority: string;
  status: string;
}

export interface reOrderInSameColumnRequest {
  columnTitle: string;
  source: string;
  destination: string;
}

export interface reOrderNotInSameColumnRequest {
  columnSource: string;
  columnDestination: string;
  sourceTasks: Array<TaskSchema>;
  destinationTasks: Array<TaskSchema>;
  source: string;
  destination: string;
}
const createTask = (payload: ITaskRequest) => {
  return protectedAxios.post<TaskSchema>("/tasks", payload);
};

const updateTask = (taskId: string, payload: Partial<ITaskRequest>) => {
  return protectedAxios.post<TaskSchema>(`/tasks/update/${taskId}`, payload);
};

const deleteTask = (taskId: string) => {
  return protectedAxios.delete<TaskSchema>(`/tasks/delete/${taskId}`);
};

const fetchToDos = async () => {
  return protectedAxios.get<Array<TaskSchema>>("/tasks/to-do");
};

const fetchInProgress = async () => {
  return protectedAxios.get<Array<TaskSchema>>("/tasks/in-progress");
};

const fetchCompleted = async () => {
  return protectedAxios.get<Array<TaskSchema>>("/tasks/completed");
};

const reOrderInSamaColumn = async (payload: reOrderInSameColumnRequest) => {
  return protectedAxios.patch<Array<TaskSchema>>("/tasks/re-order", payload);
};

const reOrderNotInSamaColumn = async (
  payload: reOrderNotInSameColumnRequest
) => {
  return protectedAxios.patch("/tasks/re-order-2", payload);
};

const TaskService = {
  createTask,
  updateTask,
  deleteTask,
  fetchToDos,
  fetchInProgress,
  fetchCompleted,
  reOrderInSamaColumn,
  reOrderNotInSamaColumn,
};

export default TaskService;
