import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./constant";
import Board from "../pages/Board/Board";
import AuthGuard from "../components/AuthGuard";
import Unauthorized from "../pages/Unauthorized";
import { TaskProvider } from "../context/TaskContext";
import RegisterV1 from "../pages/auth/register";
import LoginV1 from "../pages/auth/login";
import UserLayout from "../@core/layouts/UserLayout";
import BlankLayout from "../@core/layouts/BlankLayout";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<BlankLayout />}>
        <Route path={routes.LOGIN} element={<LoginV1 />} />
        <Route path={routes.REGISTER} element={<RegisterV1 />} />
      </Route>
      <Route element={<AuthGuard element={<UserLayout />} />}>
        <Route
          path={routes.BOARD}
          element={
            <TaskProvider>
              <AuthGuard element={<Board />} />
            </TaskProvider>
          }
        />
      </Route>
      <Route path={routes.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path="*" element={<Navigate to={routes.LOGIN} replace />} />
    </>
  )
);
