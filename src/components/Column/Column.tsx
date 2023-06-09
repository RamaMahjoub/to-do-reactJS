/** @jsxImportSource @emotion/react */
import AddIcon from "@mui/icons-material/Add";
import { FC, memo, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";
import { ColumnScheme } from "../../initial-data";
import { TaskSchema } from "../../schema/Task";
import { useTextFieldStyles } from "../../globalStyles/useTextFieldStyles";
import { useButtonStyles } from "../../globalStyles/useButtonStyles";
import Task from "../Task/Task";
import { useColumnStyle } from "./useColumnStyle";
import AddTask from "../Task/AddTask";
interface Props {
  column: ColumnScheme;
  tasks: Array<TaskSchema>;
}

const Column: FC<Props> = memo(
  ({ column, tasks }) => {
    const [open, setOpen] = useState(false);
    const textFieldStyles = useTextFieldStyles();
    const buttonStyles = useButtonStyles();
    const columnStyles = useColumnStyle();

    const renderTasks = tasks.map((item, index) => (
      <Task key={item.id} task={item} index={index} />
    ));

    const openDialog = () => {
      setOpen((pre) => !pre);
    };

    return (
      <>
        <div css={columnStyles.container}>
          <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div css={columnStyles.droppable(snapshot.isDraggingOver)}>
                  <span css={columnStyles.topbar}></span>
                  <div css={columnStyles.draggingOver(snapshot.isDraggingOver)}>
                    <h4 css={columnStyles.title}>{column.title}</h4>
                  </div>
                  <div css={columnStyles.tasksContainer}>
                    {renderTasks}
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )}
          </Droppable>
          <button
            css={buttonStyles.secondaryButton({ width: "full" })}
            onClick={openDialog}
          >
            Add task
            <AddIcon css={textFieldStyles.icon("medium")} />
          </button>
        </div>
        {open && (
          <AddTask column={column.title} open={open} handleOpen={openDialog} />
        )}
      </>
    );
  },
  (pre, next) => {
    const checkTasks = (pre: Array<TaskSchema>, next: Array<TaskSchema>) => {
      if (pre.length !== next.length) return false;
      for (let i = 0; i < pre.length; i++) {
        if (
          pre[i].id !== next[i].id ||
          pre[i].title !== next[i].title ||
          pre[i].description !== next[i].description ||
          pre[i].priority !== next[i].priority ||
          pre[i].status !== next[i].status ||
          pre[i].order !== next[i].order
        )
          return false;
      }
      return true;
    };
    return (
      pre.column.id === next.column.id &&
      pre.column.title === next.column.title &&
      checkTasks(pre.tasks, next.tasks)
    );
  }
);

export default Column;
