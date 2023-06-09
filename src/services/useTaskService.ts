/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import TaskService, { ITaskRequest } from "../apis/TaskService";
import { useCallback, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export const useTaskService = () => {
  const {
    setTodoTasks,
    setInProgressTasks,
    setCompletedTasks,
  } = useContext(TaskContext);

  const createTask = async (payload: ITaskRequest, loading: () => void) => {
    try {
      loading();
      await TaskService.createTask(payload).then((response) => {
        response.data.status === "To do"
          ? setTodoTasks((pre) => [...pre, response.data])
          : response.data.status === "In progress"
          ? setInProgressTasks((pre) => [...pre, response.data])
          : setCompletedTasks((pre) => [...pre, response.data]);
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
        response.data.status === "To do"
          ? setTodoTasks((pre) => {
              const data = [...pre];
              const taskIndex = data.findIndex((item) => item.id === taskId);
              const updatedTask = response.data;
              data[taskIndex] = updatedTask;
              return data;
            })
          : response.data.status === "In progress"
          ? setInProgressTasks((pre) => {
              const data = [...pre];
              const taskIndex = data.findIndex((item) => item.id === taskId);
              const updatedTask = response.data;
              data[taskIndex] = updatedTask;
              return data;
            })
          : setCompletedTasks((pre) => {
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
        status === "To do"
          ? setTodoTasks((pre) => {
              const data = [...pre];
              const newData = data.filter((item) => {
                return item.id !== taskId;
              });

              return newData;
            })
          : status === "In progress"
          ? setInProgressTasks((pre) => {
              const data = [...pre];
              const newData = data.filter((item) => {
                return item.id !== taskId;
              });

              return newData;
            })
          : setCompletedTasks((pre) => {
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
      await TaskService.reOrderInSamaColumn({
        columnTitle: payload.columnTitle,
        source: payload.sourceIndex,
        destination: payload.destinationIndex,
      }).then((response) => {
        payload.columnTitle === "To do"
          ? setTodoTasks(response.data)
          : payload.columnTitle === "In progress"
          ? setInProgressTasks(response.data)
          : setCompletedTasks(response.data);
      });
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const reOrderNotInSameColumn = async (payload: any) => {
    try {
      await TaskService.reOrderNotInSamaColumn({
        columnSource: payload.startTitle,
        columnDestination: payload.endTitle,
        sourceTasks: payload.srcTasks,
        destinationTasks: payload.destTasks,
        source: payload.sourceIndex,
        destination: payload.destinationIndex,
      }).then((response) => {
        payload.startTitle === "To do"
          ? setTodoTasks(response.data.sourceReturn)
          : payload.startTitle === "In progress"
          ? setInProgressTasks(response.data.sourceReturn)
          : setCompletedTasks(response.data.sourceReturn);
        payload.endTitle === "To do"
          ? setTodoTasks(response.data.destReturn)
          : payload.endTitle === "In progress"
          ? setInProgressTasks(response.data.destReturn)
          : setCompletedTasks(response.data.destReturn);
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
