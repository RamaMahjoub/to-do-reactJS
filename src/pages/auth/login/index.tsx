import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { CustomTextField } from "../../../@core/component/mui/text-field";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Icon from "../../../@core/component/icon";
import { useState } from "react";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import { useLoading } from "../../../hooks/useLoading";
import { useAuthService } from "../../../services/useAuthService";
import Loading from "../../../components/Loading";
import { loginValidation } from "../../../validations/loginValidation";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  width: "100%",
  maxWidth: 400,
  position: "relative",
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const LoginV1 = () => {
  const [showPassword, setShow] = useState<boolean>(false);
  const theme = useTheme();
  const { loading, setLoadingState } = useLoading();
  const { signin } = useAuthService();
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormSubmit(
    initialValues,
    (values: any) => {
      signin(values, setLoadingState);
    },
    loginValidation
  );

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  console.log(
    !formik.isValid,
    formik.validateOnMount,
    !formik.isValid && formik.validateOnMount
  );

  return (
    <Box className="content-center">
      <BoxWrapper>
        <Card>
          <CardContent
            sx={{ p: (theme) => `${theme.spacing(10.5, 8, 8)} !important` }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Keeper
            </Typography>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                Welcome to Keeper! 👋🏻
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <CustomTextField
                fullWidth
                type="email"
                label="Email"
                sx={{ mb: 4 }}
                {...formik.getFieldProps("email")}
                helperText={
                  formik.touched.email && Boolean(formik.errors.email)
                    ? String(formik.errors.email)
                    : ""
                }
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <CustomTextField
                fullWidth
                label="Password"
                id="auth-register-password"
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                sx={{ mb: 4 }}
                helperText={
                  formik.touched.password && Boolean(formik.errors.password)
                    ? String(formik.errors.password)
                    : ""
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleShow}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                      >
                        <Icon
                          fontSize="1.25rem"
                          icon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 4, textTransform: "none" }}
                disabled={!formik.dirty || !formik.isValid}
              >
                {!loading ? "Sign in" : <Loading loading={loading} />}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "text.secondary", mr: 2 }}>
                  Don't have an account?
                </Typography>
                <Typography
                  component={LinkStyled}
                  href="/register"
                  sx={{ fontSize: theme.typography.body1.fontSize }}
                >
                  Sign up
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </BoxWrapper>
    </Box>
  );
};

export default LoginV1;
