/** @jsxImportSource @emotion/react */
import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoading } from "../../../../hooks/useLoading";
import { useTaskService } from "../../../../services/useTaskService";
import Loading from "../../../../components/Loading";

interface TaskDeleteProps {
  taskId: string;
  status: string;
  open: boolean;
  handleOpen: () => void;
}
const TaskDelete = ({ taskId, status, open, handleOpen }: TaskDeleteProps) => {
  const { loading, setLoadingState } = useLoading();
  const { deleteTask } = useTaskService();

  const deleteFun = async () => {
    try {
      await deleteTask(taskId, status, setLoadingState);
    } finally {
      handleOpen();
    }
  };
  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          pt: (theme) => `${theme.spacing(8)} !important`,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Delete Task
        </Typography>
      </DialogTitle>
      <DialogContent>Are you sure you want to delete this task?</DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={{ mr: 4, textTransform: "none" }}
          onClick={deleteFun}
        >
          {!loading ? "Delete" : <Loading loading={loading} />}
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          variant="tonal"
          color="secondary"
          onClick={handleOpen}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDelete;
