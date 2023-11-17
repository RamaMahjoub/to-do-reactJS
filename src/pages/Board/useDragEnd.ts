import { useCallback, useContext } from "react";
import { data } from "../../initial-data";
import { useTaskService } from "../../services/useTaskService";
import { TaskContext } from "../../context/TaskContext";

export const useDragEnd = () => {
  const { getTasks } = useContext(TaskContext);
  const { reOrderInSameColumn, reOrderNotInSameColumn } = useTaskService();

  const handleDragEnd = useCallback(
    async (result: any) => {
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
        reOrderInSameColumn(payload);
      } else {
        const start = data.columns[source.droppableId];
        const end = data.columns[destination.droppableId];
        let src = getTasks(start.title),
          dest = getTasks(end.title);

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
    },
    [getTasks, reOrderInSameColumn, reOrderNotInSameColumn]
  );

  return { handleDragEnd };
};
