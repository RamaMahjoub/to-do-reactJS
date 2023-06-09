/** @jsxImportSource @emotion/react */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { routes } from "../router/constant";
import { useDialogStyle } from "../globalStyles/useDialogStyles";
import { useButtonStyles } from "../globalStyles/useButtonStyles";

const TokenExpire = () => {
  const { show, showLoginDialog } = useContext(AuthContext);
  const dialogStyles = useDialogStyle();
  const buttonStyles = useButtonStyles();
  const handleClick = () => {
    show();
    window.location.replace(routes.LOGIN);
  };
  return (
    <Dialog open={showLoginDialog} css={dialogStyles.dialog}>
      <DialogTitle>Session Expired</DialogTitle>
      <DialogContent>
        Your session has expired. Please log in again to continue.
      </DialogContent>
      <DialogActions css={dialogStyles.actions}>
        <button css={buttonStyles.button} onClick={handleClick}>
          SignIn
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenExpire;
