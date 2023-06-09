/** @jsxImportSource @emotion/react */
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FC, memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskSchema } from "../../schema/Task";
import { useTextFieldStyles } from "../../globalStyles/useTextFieldStyles";
import { useTaskStyles } from "./useTaskStyles";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

interface Props {
  task: TaskSchema;
  index: number;
}

const Task: FC<Props> = memo(({ task, index }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const textFieldStyles = useTextFieldStyles();
  const taskStyles = useTaskStyles();
  // useEffect(() => {
  //   console.log("task re-rendered");
  // });
  const handleOpenEdit = () => {
    setOpenEdit((pre) => !pre);
  };

  const handleOpenDelete = () => {
    setOpenDelete((pre) => !pre);
  };

  return (
    <>
      <Draggable index={index} draggableId={task.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            css={taskStyles.task}
          >
            <h6 css={taskStyles.priorityContainer(task.priority)}>
              {task.priority}
            </h6>
            <h4 css={taskStyles.item("dark-gray")}>{task.title}</h4>
            <h5 css={taskStyles.item("light-gray")}>{task.description}</h5>
            <div css={taskStyles.actionsContainer}>
              <button css={taskStyles.action} onClick={handleOpenEdit}>
                <ModeEditIcon css={textFieldStyles.icon("medium")} />
              </button>
              <button css={taskStyles.action} onClick={handleOpenDelete}>
                <DeleteOutlineIcon css={textFieldStyles.icon("medium")} />
              </button>
            </div>
          </div>
        )}
      </Draggable>
      {openEdit && (
        <EditTask
          task={task}
          open={openEdit}
          handleOpen={handleOpenEdit}
        />
      )}
      {openDelete && (
        <DeleteTask
          taskId={task.id}
          status={task.status}
          open={openDelete}
          handleOpen={handleOpenDelete}
        />
      )}
    </>
  );
});

export default Task;
