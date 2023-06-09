/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import FormInput from "../FormInput";
import RadioInputGroup from "../RadioInputGroup";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { useTextFieldStyles } from "../../globalStyles/useTextFieldStyles";
import { useButtonStyles } from "../../globalStyles/useButtonStyles";
import { useDialogStyle } from "../../globalStyles/useDialogStyles";
import { useLoading } from "../../hooks/useLoading";
import Loading from "../Loading";
import { useTaskService } from "../../services/useTaskService";
import { ITaskRequest } from "../../apis/TaskService";

interface Props {
  column: string;
  open: boolean;
  handleOpen: () => void;
}
const AddTask: FC<Props> = ({ column, open, handleOpen }) => {
  const { loading, setLoadingState } = useLoading();
  const textFieldStyles = useTextFieldStyles();
  const buttonStyles = useButtonStyles();
  const dialogStyles = useDialogStyle();
  const { createTask } = useTaskService();
  const initialValues: ITaskRequest = {
    title: "",
    description: "",
    priority: "normal",
    status: column,
  };
  const formik = useFormSubmit(initialValues, () => {});

  const addTask = async () => {
    try {
      await createTask(formik.values, setLoadingState);
    } finally {
      handleOpen();
    }
  };
  return (
    <Dialog open={open} css={dialogStyles.dialog}>
      <DialogTitle>Add Task</DialogTitle>
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
                disabled: column !== "To do",
                defaultChecked: column === "To do",
              },
              {
                label: "In progress",
                value: "In progress",
                name: "task status",
                disabled: column !== "In progress",
                defaultChecked: column === "In progress",
              },
              {
                label: "Completed",
                value: "Completed",
                name: "task status",
                disabled: column !== "Completed",
                defaultChecked: column === "Completed",
              },
            ]}
          />
        </form>
      </DialogContent>
      <DialogActions css={dialogStyles.actions}>
        <button css={buttonStyles.button} onClick={handleOpen}>
          Cancel
        </button>
        <button type="button" css={buttonStyles.pinkButton} onClick={addTask}>
          {!loading ? "Save" : <Loading loading={loading} />}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
