import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../router/constant";
import { getStoredUser } from "../user-storage";

interface Props {
  element: ReactElement;
}

const AuthGuard: FC<Props> = ({ element }) => {
  const user = getStoredUser();
  if (!user) {
    return <Navigate to={`/${routes.UNAUTHORIZED}`} replace />;
  } else return  element;
};

export default AuthGuard;
