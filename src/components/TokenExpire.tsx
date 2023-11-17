/** @jsxImportSource @emotion/react */
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { routes } from "../router/constant";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TokenExpire = () => {
  const { show, showLoginDialog } = useContext(AuthContext);
  const handleClick = () => {
    show();
    window.location.replace(routes.LOGIN);
  };
  return (
    <Dialog maxWidth="sm" open={showLoginDialog}>
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
          Session Expired
        </Typography>
      </DialogTitle>
      <DialogContent>
        Your session has expired. Please log in again to continue.
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{ mr: 4, textTransform: "none" }}
          onClick={handleClick}
        >
          SignIn
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenExpire;
