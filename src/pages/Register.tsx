/** @jsxImportSource @emotion/react */
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { registerValidation } from "../validations/registerValidation";
import { IRegisterRequest } from "../apis/AuthServices";
import { routes } from "../router/constant";
import { useLoading } from "../hooks/useLoading";
import { useAuthService } from "../services/useAuthService";
import { useTextFieldStyles } from "../globalStyles/useTextFieldStyles";
import { useFormStyles } from "../globalStyles/useFormStyles";
import { useButtonStyles } from "../globalStyles/useButtonStyles";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import { useFormSubmit } from "../hooks/useFormSubmit";
import Loading from "../components/Loading";

const Register = () => {
  const [showPassword, setShow] = useState(false);
  const [showConfirmPassword, setShowConfirm] = useState(false);
  const { loading, setLoadingState } = useLoading();
  const { signup } = useAuthService();
  const textFieldStyles = useTextFieldStyles();
  const formStyles = useFormStyles();
  const buttonStyles = useButtonStyles();
  const initialValues: IRegisterRequest = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormSubmit(
    initialValues,
    (values: IRegisterRequest) => {
      signup(values, setLoadingState);
    },
    registerValidation
  );

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  const handleShowConfirm = () => {
    setShowConfirm((pre) => !pre);
  };
  return (
    <div style={{ height: "100%", display: "grid" }}>
      <FormContainer title="Hello Friend!">
        <form css={formStyles.form} onSubmit={formik.handleSubmit}>
          <FormInput
            placeholder="email"
            type="text"
            css={textFieldStyles.primaryInput}
            icon={<EmailIcon css={textFieldStyles.icon("small")} />}
            {...formik.getFieldProps("email")}
          />
          <FormInput
            placeholder="password"
            type={!showPassword ? "password" : "text"}
            css={textFieldStyles.primaryInput}
            icon={
              showPassword ? (
                <VisibilityIcon
                  css={textFieldStyles.icon("small")}
                  onClick={handleShow}
                />
              ) : (
                <VisibilityOffIcon
                  css={textFieldStyles.icon("small")}
                  onClick={handleShow}
                />
              )
            }
            {...formik.getFieldProps("password")}
          />
          <FormInput
            placeholder="confirm password"
            type={!showConfirmPassword ? "password" : "text"}
            css={textFieldStyles.primaryInput}
            icon={
              showConfirmPassword ? (
                <VisibilityIcon
                  css={textFieldStyles.icon("small")}
                  onClick={handleShowConfirm}
                />
              ) : (
                <VisibilityOffIcon
                  css={textFieldStyles.icon("small")}
                  onClick={handleShowConfirm}
                />
              )
            }
            {...formik.getFieldProps("confirmPassword")}
          />
          <p>
            already have account? <a href={routes.LOGIN}>Sign in</a>
          </p>

          <button type="submit" css={buttonStyles.pinkButton}>
            {!loading ? "Sign up" : <Loading loading={loading} />}
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Register;
