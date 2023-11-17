import * as Yup from "yup";
export const taskValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required"),
});
