import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAuthService } from "../../../services/useAuthService";
import { useLoading } from "../../../hooks/useLoading";
import Loading from "../../../components/Loading";

interface Props {
  open: boolean;
  handleOpen: () => void;
}
const Logout = ({ open, handleOpen }: Props) => {
  const { loading, setLoadingState } = useLoading();
  const { logout } = useAuthService();

  const handleLogout = async () => {
    try {
      await logout(setLoadingState);
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
          Logout
        </Typography>
      </DialogTitle>
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ mr: 4, textTransform: "none" }}
          onClick={handleLogout}
        >
          {!loading ? "Logout" : <Loading loading={loading} />}
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

export default Logout