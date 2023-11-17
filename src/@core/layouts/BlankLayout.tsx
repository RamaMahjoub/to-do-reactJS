import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { Outlet } from "react-router-dom";

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  "& .content-center": {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },
}));

const BlankLayout = () => {
  return (
    <BlankLayoutWrapper className="layout-wrapper">
      <Box
        className="app-content"
        sx={{ overflow: "hidden", minHeight: "100vh", position: "relative" }}
      >
        <Outlet />
      </Box>
    </BlankLayoutWrapper>
  );
};

export default BlankLayout;
