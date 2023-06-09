/** @jsxImportSource @emotion/react */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Loading from "./Loading";
import { FC } from "react";
import { useLoading } from "../hooks/useLoading";
import { useButtonStyles } from "../globalStyles/useButtonStyles";
import { useDialogStyle } from "../globalStyles/useDialogStyles";
import { useAuthService } from "../services/useAuthService";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const Logout: FC<Props> = ({ open, handleOpen }) => {
  const { loading, setLoadingState } = useLoading();
  const buttonStyles = useButtonStyles();
  const dialogStyles = useDialogStyle();
  const { logout } = useAuthService();
  
  const handleLogout = async () => {
    try {
      await logout(setLoadingState);
    } finally {
      handleOpen();
    }
  };
  return (
    <Dialog open={open} css={dialogStyles.dialog}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions css={dialogStyles.actions}>
        <button css={buttonStyles.button} onClick={handleOpen}>
          Cancel
        </button>
        <button css={buttonStyles.pinkButton} onClick={handleLogout}>
          {!loading ? "Logout" : <Loading loading={loading} />}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
