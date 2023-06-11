/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import TaskService, { ITaskRequest } from "../apis/TaskService";
import { useCallback, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const useTaskService = () => {
  const { setTodoTasks, setInProgressTasks, setCompletedTasks, getTasks } =
    useContext(TaskContext);

  const createTask = async (payload: ITaskRequest, loading: () => void) => {
    try {
      loading();
      await TaskService.createTask(payload).then((response) => {
        const { handleTasks } = getTasks(response.data.status);
        handleTasks((pre) => [...pre, response.data]);
        loading();
        toast.success("Task added successfully");
      });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  const editTask = async (
    taskId: string,
    payload: Partial<ITaskRequest>,
    loading: () => void
  ) => {
    try {
      loading();
      await TaskService.updateTask(taskId, payload).then((response) => {
        const { handleTasks } = getTasks(response.data.status);
        handleTasks((pre) => {
          const data = [...pre];
          const taskIndex = data.findIndex((item) => item.id === taskId);
          const updatedTask = response.data;
          data[taskIndex] = updatedTask;
          return data;
        });
        loading();
        toast.success("Task edited successfully");
      });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  const deleteTask = async (
    taskId: string,
    status: string,
    loading: () => void
  ) => {
    try {
      loading();
      await TaskService.deleteTask(taskId).then(() => {
        const { handleTasks } = getTasks(status);
        handleTasks((pre) => {
          const data = [...pre];
          const newData = data.filter((item) => {
            return item.id !== taskId;
          });

          return newData;
        });
        loading();
        toast.success("Task deleted successfully");
      });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  const fetchTodos = useCallback(async () => {
    try {
      await TaskService.fetchToDos().then((response) =>
        setTodoTasks(response.data)
      );
    } catch (err) {
      toast.error("something went wrong");
    }
  }, []);

  const fetchInProgress = useCallback(async () => {
    try {
      await TaskService.fetchInProgress().then((response) =>
        setInProgressTasks(response.data)
      );
    } catch (err) {
      toast.error("something went wrong");
    }
  }, []);

  const fetchCompleted = useCallback(async () => {
    try {
      await TaskService.fetchCompleted().then((response) =>
        setCompletedTasks(response.data)
      );
    } catch (err) {
      toast.error("something went wrong");
    }
  }, []);

  const reOrderInSameColumn = async (payload: any) => {
    try {
      const { handleTasks } = getTasks(payload.columnTitle);
      await TaskService.reOrderInSamaColumn({
        columnTitle: payload.columnTitle,
        source: payload.sourceIndex,
        destination: payload.destinationIndex,
      }).then((response) => {
        handleTasks(response.data);
      });
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const reOrderNotInSameColumn = async (payload: any) => {
    try {
      const source = getTasks(payload.startTitle);
      const dest = getTasks(payload.endTitle);
      await TaskService.reOrderNotInSamaColumn({
        columnSource: payload.startTitle,
        columnDestination: payload.endTitle,
        sourceTasks: payload.srcTasks,
        destinationTasks: payload.destTasks,
        source: payload.sourceIndex,
        destination: payload.destinationIndex,
      }).then((response) => {
        source.handleTasks(response.data.sourceReturn);
        dest.handleTasks(response.data.destReturn);
      });
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return {
    createTask,
    editTask,
    deleteTask,
    fetchTodos,
    fetchInProgress,
    fetchCompleted,
    reOrderInSameColumn,
    reOrderNotInSameColumn,
  };
};
