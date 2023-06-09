/** @jsxImportSource @emotion/react */
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
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

const Login = () => {
  const [showPassword, setShow] = useState(false);
  const { loading, setLoadingState } = useLoading();
  const textFieldStyles = useTextFieldStyles();
  const formStyles = useFormStyles();
  const buttonStyles = useButtonStyles();
  const { signin } = useAuthService();

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormSubmit(initialValues, (values: any) => {
    signin(values, setLoadingState);
  });

  return (
    <div style={{ height: "100%", display: "grid" }}>
      <FormContainer title="Welcome back!">
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
          <p>
            don't have account? <a href={routes.REGISTER}>Sign up</a>
          </p>

          <button type="submit" css={buttonStyles.pinkButton}>
            {!loading ? "Sign in" : <Loading loading={loading} />}
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Login;
