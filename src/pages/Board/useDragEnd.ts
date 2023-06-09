import { useContext } from "react";
import { data } from "../../initial-data";
import { useTaskService } from "../../services/useTaskService";
import { TaskContext } from "../../context/TaskContext";

export const useDragEnd = () => {
  const { toDoTasks, inProgressTasks, completedTasks } =
    useContext(TaskContext);
  const { reOrderInSameColumn, reOrderNotInSameColumn } = useTaskService();
  
  const handleDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = data.columns[source.droppableId];
      const payload = {
        columnTitle: column.title,
        sourceIndex: source.index + 1,
        destinationIndex: destination.index + 1,
      };
      if (column.title === "To do") await reOrderInSameColumn(payload);
      else if (column.title === "In progress")
        await reOrderInSameColumn(payload);
      else if (column.title === "Completed") await reOrderInSameColumn(payload);
    } else {
      const start = data.columns[source.droppableId];
      const end = data.columns[destination.droppableId];
      let src: any, dest: any;
      start.title === "To do"
        ? (src = { tasks: toDoTasks })
        : start.title === "In progress"
        ? (src = { tasks: inProgressTasks })
        : (src = { tasks: completedTasks });

      end.title === "To do"
        ? (dest = { tasks: toDoTasks })
        : end.title === "In progress"
        ? (dest = { tasks: inProgressTasks })
        : (dest = { tasks: completedTasks });

      const payload = {
        startTitle: start.title,
        endTitle: end.title,
        srcTasks: src.tasks,
        destTasks: dest.tasks,
        sourceIndex: source.index + 1,
        destinationIndex: destination.index + 1,
      };
      await reOrderNotInSameColumn(payload);
    }
  };

  return { handleDragEnd };
};
