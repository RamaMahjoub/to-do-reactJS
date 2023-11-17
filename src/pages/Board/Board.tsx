/** @jsxImportSource @emotion/react */
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect } from "react";
import { data } from "../../initial-data";
import { useTaskService } from "../../services/useTaskService";
import { useDragEnd } from "./useDragEnd";
import Column from "./Column";
import Grid from "@mui/material/Grid";

const Board = () => {
  const { handleDragEnd } = useDragEnd();
  const { fetchTodos, fetchInProgress, fetchCompleted } = useTaskService();

  useEffect(() => {
    fetchTodos();
    fetchInProgress();
    fetchCompleted();
  }, [fetchTodos, fetchInProgress, fetchCompleted]);

  let renderColumns = data.columnOrder.map((columnId) => {
    return <Column key={columnId} column={data.columns[columnId]} />;
  });
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container rowSpacing={3} columnSpacing={{ sm: 6 }}>
        {renderColumns}
      </Grid>
    </DragDropContext>
  );
};

export default Board;
