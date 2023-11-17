import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import TokenExpire from "./components/TokenExpire";
import { apiInterceptor, refreshAxios } from "./apis/axios";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles";

function App() {
  const { showLoginDialog, show } = useContext(AuthContext);

  refreshAxios.interceptors.request.use((config) =>
    apiInterceptor(config, show)
  );

  const theme = useTheme()
  
  console.log('theme', theme)
  return (
    <>
      <ToastContainer
        transition={Flip}                
        autoClose={8000}
        hideProgressBar={true}
        theme="colored"
        position={toast.POSITION.BOTTOM_CENTER}
      ></ToastContainer>
      {showLoginDialog && <TokenExpire />}
      <RouterProvider router={router} />
    </>
  );                
}
 
export default App;
