import { memo, useContext, useEffect, useMemo, useState } from "react";
import { ColumnScheme } from "../../../initial-data";
import { TaskContext } from "../../../context/TaskContext";
import TaskCard from "../Task/task-card";
import { Droppable } from "react-beautiful-dnd";
import TaskAdd from "../Task/add";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Grid, IconButton } from "@mui/material";
import Icon from "../../../@core/component/icon";
import { hexToRGBA } from "../../../@core/utils/hex-to-rgba";
interface Props {
  column: ColumnScheme;
}
const Column = memo(
  ({ column }: Props) => {
    const [open, setOpen] = useState(false);
    const { getTasks } = useContext(TaskContext);
    const tasks = useMemo(
      () => getTasks(column.title).tasks,
      [getTasks, column.title]
    );

    const renderTasks = tasks.map((item, index) => (
      <TaskCard key={item.id} task={item} index={index} />
    ));

    const openDialog = () => {
      setOpen((pre) => !pre);
    };

    useEffect(() => console.log("re renderrrrrrrrrrrrr", column.id, tasks));
    return (
      <>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              height: "fit-content",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) =>
                  hexToRGBA(theme.palette.background.paper, 1),
              }}
            >
              <CardHeader
                title={column.title}
                action={
                  <IconButton onClick={openDialog}>
                    <Icon icon="tabler:plus" fontSize="1rem" />
                  </IconButton>
                }
              />
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ overflow: "auto", flex: "1 1 0%" }}>
                        {renderTasks}
                        {provided.placeholder}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
          </Card>
        </Grid>
        {open && (
          <TaskAdd column={column.title} open={open} handleOpen={openDialog} />
        )}
      </>
    );
  },
  (pre, next) => {
    return (
      pre.column.id === next.column.id && pre.column.title === next.column.title
    );
  }
);
export default Column;
