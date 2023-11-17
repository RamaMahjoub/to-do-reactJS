import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeToggler from "./ModeToggler";
import IconButton from "@mui/material/IconButton";
import Icon from "../../component/icon";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";
import { hexToRGBA } from "../../utils/hex-to-rgba";
import Logout from "../../../pages/auth/logout";

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(0, 6)} !important`,
}));

const LayoutAppBar = () => {
  const theme = useTheme();
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const handleOpenLogout = () => {
    setOpenLogout((pre) => !pre);
  };

  const appBarBlurEffect = {
    "&:after": {
      top: 0,
      left: 0,
      zIndex: -1,
      width: "100%",
      content: '""',
      position: "absolute",
      height: `calc(${
        theme.mixins.toolbar.minHeight as number
      }px + ${theme.spacing(4)})`,
      backdropFilter: "blur(10px)",
      mask: `linear-gradient(blue, red 18%, transparent 100%)`,
      background: `linear-gradient(180deg,${hexToRGBA(
        theme.palette.background.default,
        0.7
      )} 44%, ${hexToRGBA(
        theme.palette.background.default,
        0.43
      )} 73%, ${hexToRGBA(theme.palette.background.default, 0)})`,
    },
  };
  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      position="sticky"
      sx={{ ...appBarBlurEffect }}
    >
      <Toolbar
        className="navbar-content-container"
        sx={{
          minHeight: (theme) =>
            `${theme.mixins.toolbar.minHeight as number}px !important`,
          backgroundColor: (theme) =>
            hexToRGBA(theme.palette.background.paper, 1),
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            className="actions-left"
            sx={{ mr: 2, display: "flex", alignItems: "center" }}
          >
            Keeper
          </Typography>
          <Box
            className="actions-right"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ModeToggler />
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={handleOpenLogout}
            >
              <Icon icon="tabler:logout" />
            </IconButton>
          </Box>
        </Box>
        {openLogout && (
          <Logout open={openLogout} handleOpen={handleOpenLogout} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
