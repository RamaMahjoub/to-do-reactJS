/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import RadioInputGroup from "../RadioInputGroup";
import FormInput from "../FormInput";
import { TaskSchema } from "../../schema/Task";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useTextFieldStyles } from "../../globalStyles/useTextFieldStyles";
import { useLoading } from "../../hooks/useLoading";
import { useButtonStyles } from "../../globalStyles/useButtonStyles";
import { useDialogStyle } from "../../globalStyles/useDialogStyles";
import Loading from "../Loading";
import { useTaskService } from "../../services/useTaskService";
import { ITaskRequest } from "../../apis/TaskService";

interface Props {
  task: TaskSchema;
  open: boolean;
  handleOpen: () => void;
}

const EditTask: FC<Props> = ({ task, open, handleOpen }) => {
  const { loading, setLoadingState } = useLoading();
  const textFieldStyles = useTextFieldStyles();
  const buttonStyles = useButtonStyles();
  const dialogStyles = useDialogStyle();
  const { editTask } = useTaskService();
  const initialValues: ITaskRequest = {
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  };
  const formik = useFormSubmit(initialValues, () => {});

  const edit = async () => {
    try {
      await editTask(task.id, formik.values, setLoadingState);
    } finally {
      handleOpen();
    }
  };
  return (
    <Dialog open={open} css={dialogStyles.dialog}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form>
          <FormInput
            placeholder="Title"
            type="text"
            css={textFieldStyles.primaryInput}
            {...formik.getFieldProps("title")}
          />
          <textarea
            placeholder="Description"
            rows={3}
            css={textFieldStyles.textAreaInput}
            {...formik.getFieldProps("description")}
          />
          <p>Task Priority</p>
          <RadioInputGroup
            options={[
              {
                label: "Normal",
                value: "normal",
                name: "priority",
                checked: formik.values.priority === "normal",
              },
              {
                label: "Important",
                value: "important",
                name: "priority",
                checked: formik.values.priority === "important",
              },
            ]}
            handleChange={formik.handleChange}
          />
          <p>Task Status</p>
          <RadioInputGroup
            options={[
              {
                label: "To do",
                value: "To do",
                name: "task status",
                disabled: task.status !== "To do",
                defaultChecked: task.status === "To do",
              },
              {
                label: "In progress",
                value: "In progress",
                name: "task status",
                disabled: task.status !== "In progress",
                defaultChecked: task.status === "In progress",
              },
              {
                label: "Completed",
                value: "Completed",
                name: "task status",
                disabled: task.status !== "Completed",
                defaultChecked: task.status === "Completed",
              },
            ]}
          />
        </form>
      </DialogContent>
      <DialogActions css={dialogStyles.actions}>
        <button css={buttonStyles.button} onClick={handleOpen}>
          Cancel
        </button>
        <button type="button" css={buttonStyles.pinkButton} onClick={edit}>
          {!loading ? "Save" : <Loading loading={loading} />}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTask;
