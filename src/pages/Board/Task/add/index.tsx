import Dialog from "@mui/material/Dialog";
import { useFormSubmit } from "../../../../hooks/useFormSubmit";
import { useLoading } from "../../../../hooks/useLoading";
import { ITaskRequest } from "../../../../apis/TaskService";
import { useTaskService } from "../../../../services/useTaskService";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Loading from "../../../../components/Loading";
import DialogActions from "@mui/material/DialogActions";
import { CustomTextField } from "../../../../@core/component/mui/text-field";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomChip from "./../../../../@core/component/mui/chip";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { colors } from "../types";
import { taskValidation } from "../../../../validations/taskValidation";
import { useRef } from "react";

type TaskAddProps = {
  column: string;
  open: boolean;
  handleOpen: () => void;
};

const TaskAdd = ({ column, open, handleOpen }: TaskAddProps) => {
  const submitBtn = useRef<HTMLButtonElement>(null);
  const { loading, setLoadingState } = useLoading();
  const { createTask } = useTaskService();
  const initialValues: ITaskRequest = {
    title: "",
    description: "",
    priority: "Normal",
    status: column,
  };
  const formik = useFormSubmit(
    initialValues,
    () => {
      if (submitBtn.current) submitBtn.current.click();
    },
    taskValidation
  );

  const addTask = async () => {
    try {
      await createTask(formik.values, setLoadingState);
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
          Create New Task
        </Typography>
        <CustomChip
          rounded
          size="small"
          skin="light"
          label={column}
          customcolor={colors[column]}
          sx={{
            "& .MuiChip-label": { textTransform: "capitalize" },
          }}
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            fullWidth
            type="text"
            placeholder="Enter Task Title"
            label="Title"
            sx={{ mb: 4 }}
            {...formik.getFieldProps("title")}
            helperText={
              formik.touched.title && Boolean(formik.errors.title)
                ? String(formik.errors.title)
                : ""
            }
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          <CustomTextField
            fullWidth
            type="text"
            placeholder="Enter Task Description"
            label="Description"
            multiline
            sx={{ mb: 4 }}
            {...formik.getFieldProps("description")}
            helperText={
              formik.touched.description && Boolean(formik.errors.description)
                ? String(formik.errors.description)
                : ""
            }
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
          />
          <Typography>Task Priority</Typography>
          <RadioGroup
            row
            aria-label="priority"
            name="priority"
            value={formik.getFieldProps("priority").value}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="Normal"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel
              value="Important"
              control={<Radio />}
              label="Important"
            />
          </RadioGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          ref={submitBtn}
          type="submit"
          variant="contained"
          sx={{ mr: 4, textTransform: "none" }}
          disabled={!formik.dirty || !formik.isValid}
          onClick={addTask}
        >
          {!loading ? "Save" : <Loading loading={loading} />}
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

export default TaskAdd;
