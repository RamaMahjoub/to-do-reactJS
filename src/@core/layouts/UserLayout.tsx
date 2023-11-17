import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LayoutAppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";

const LayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  maxHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const UserLayout = () => {
  return (
    <LayoutWrapper className="layout-wrapper">
      <MainContentWrapper className="layout-content-wrapper">
        <LayoutAppBar />
        <ContentWrapper className="layout-page-content">
          <Outlet />
        </ContentWrapper>
      </MainContentWrapper>
    </LayoutWrapper>
  );
};

export default UserLayout;
