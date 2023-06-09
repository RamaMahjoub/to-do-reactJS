/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useButtonStyles } from "../../globalStyles/useButtonStyles";
import { useDialogStyle } from "../../globalStyles/useDialogStyles";
import { useLoading } from "../../hooks/useLoading";
import { FC } from "react";
import Loading from "../Loading";
import { useTaskService } from "../../services/useTaskService";

interface Props {
  taskId: string;
  status: string;
  open: boolean;
  handleOpen: () => void;
}
const DeleteTask: FC<Props> = ({ taskId, status, open, handleOpen }) => {
  const { loading, setLoadingState } = useLoading();
  const buttonStyles = useButtonStyles();
  const dialogStyles = useDialogStyle();
  const { deleteTask } = useTaskService();

  const deleteFun = async () => {
    try {
      await deleteTask(taskId, status, setLoadingState);
    } finally {
      handleOpen();
    }
  };
  return (
    <Dialog open={open} css={dialogStyles.dialog}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>Are you sure you want to delete this task?</DialogContent>
      <DialogActions css={dialogStyles.actions}>
        <button css={buttonStyles.button} onClick={handleOpen}>
          Cancel
        </button>
        <button css={buttonStyles.pinkButton} onClick={deleteFun}>
          {!loading ? "Delete" : <Loading loading={loading} />}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTask;
