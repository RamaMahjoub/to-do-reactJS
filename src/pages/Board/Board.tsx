/** @jsxImportSource @emotion/react */
import { DragDropContext } from "react-beautiful-dnd";
import { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useButtonStyles } from "../../globalStyles/useButtonStyles";
import { useTextFieldStyles } from "../../globalStyles/useTextFieldStyles";
import { data } from "../../initial-data";
import Column from "../../components/Column/Column";
import { useBoardStyles } from "./useBoardStyles";
import Logout from "../../components/Logout";
import { useTaskService } from "../../services/useTaskService";
import { TaskContext } from "../../context/TaskContext";
import { useDragEnd } from "./useDragEnd";

const Board = () => {
  const buttonStyles = useButtonStyles();
  const textFieldStyles = useTextFieldStyles();
  const boardStyles = useBoardStyles();
  const { toDoTasks, inProgressTasks, completedTasks } =
    useContext(TaskContext);
  const { handleDragEnd } = useDragEnd();
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const { fetchTodos, fetchInProgress, fetchCompleted } = useTaskService();

  useEffect(() => {
    fetchTodos();
    fetchInProgress();
    fetchCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTodos, fetchInProgress, fetchCompleted]);

  const handleOpenLogout = () => {
    setOpenLogout((pre) => !pre);
  };

  let renderColumns = data.columnOrder.map((columnId) => {
    return (
      <Column
        key={columnId}
        column={data.columns[columnId]}
        tasks={
          data.columns[columnId].title === "To do"
            ? toDoTasks
            : data.columns[columnId].title === "In progress"
            ? inProgressTasks
            : completedTasks
        }
      />
    );
  });
  return (
    <div css={boardStyles.board}>
      <h2 css={boardStyles.topbar}>
        Keeper
        <button
          css={buttonStyles.secondaryButton({ bg: "none" })}
          onClick={handleOpenLogout}
        >
          Logout
          <LogoutIcon css={textFieldStyles.icon("medium")} />
        </button>
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div css={boardStyles.columnsContainer}>{renderColumns}</div>
      </DragDropContext>
      {openLogout && <Logout open={openLogout} handleOpen={handleOpenLogout} />}
    </div>
  );
};

export default Board;
