import { useContext } from "react";
import AuthService, { IRegisterRequest } from "../apis/AuthServices";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { clearStoredUser, getStoredUser, setStoredUser } from "../user-storage";
import { routes } from "../router/constant";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export const useAuthService = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const signup = async (payload: IRegisterRequest, loading: any) => {
    try {
      loading();
      await AuthService.signUp(payload).then((response) => {
        setStoredUser(response.data);
        setUser(jwt_decode(getStoredUser()!.accessToken));
        loading();
        navigate(`/${routes.BOARD}`);
      });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  const signin = async (payload: any, loading: any) => {
    try {
      loading();
      await AuthService.signIn(payload).then((response) => {
        setStoredUser(response.data);
        if (getStoredUser() != null) {
          setUser(jwt_decode(getStoredUser()!.accessToken));
        }
        loading();
        navigate(`/${routes.BOARD}`);
      });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  const logout = async (loading: any) => {
    try {
      loading();
      await AuthService.logout();
      clearStoredUser();
      loading();
      navigate(`/${routes.LOGIN}`, { replace: true });
    } catch (err) {
      toast.error("something went wrong");
      loading();
    }
  };

  return {
    signup,
    signin,
    logout,
  };
};
