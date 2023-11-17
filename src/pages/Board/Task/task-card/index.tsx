import { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskSchema } from "../../../../schema/Task";
import TaskEdit from "../edit";
import TaskDelete from "../delete";
import Typography from "@mui/material/Typography";
import CustomChip from "./../../../../@core/component/mui/chip";
import { colors } from "../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Icon from "../../../../@core/component/icon";
import { useTheme } from "@mui/material/styles";

interface Props {
  task: TaskSchema;
  index: number;
}

const TaskCard = memo(({ task, index }: Props) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  useEffect(() => {
    console.log("task re-rendered");
  });
  const handleOpenEdit = () => {
    setOpenEdit((pre) => !pre);
  };

  const handleOpenDelete = () => {
    setOpenDelete((pre) => !pre);
  };
  console.log(colors[task.priority]);
  const theme = useTheme()
  return (
    <>
      <Draggable index={index} draggableId={task.id}>
        {(provided) => (
          <Card
            sx={{ m: 2, backgroundColor: theme.palette.customColors.tableHeaderBg  }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardContent>
              <Box
                sx={{
                  mt: 1,
                  mb: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  {task.title}
                </Typography>
                <CustomChip
                  rounded
                  size="small"
                  skin="light"
                  label={task.priority}
                  customcolor={colors[task.priority]}
                  sx={{
                    "& .MuiChip-label": { textTransform: "capitalize" },
                  }}
                />
              </Box>
              <Typography sx={{ color: "text.secondary" }} variant="body2">
                {task.description}
              </Typography>
            </CardContent>
            <CardActions className="card-action-dense">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <IconButton id="edit-button" onClick={handleOpenEdit}>
                  <Icon icon="tabler:edit" fontSize={20} />
                </IconButton>
                <IconButton id="delete-button" onClick={handleOpenDelete}>
                  <Icon icon="tabler:trash" fontSize={20} />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        )}
      </Draggable>
      {openEdit && (
        <TaskEdit task={task} open={openEdit} handleOpen={handleOpenEdit} />
      )}
      {openDelete && (
        <TaskDelete
          taskId={task.id}
          status={task.status}
          open={openDelete}
          handleOpen={handleOpenDelete}
        />
      )}
    </>
  );
});

export default TaskCard;
