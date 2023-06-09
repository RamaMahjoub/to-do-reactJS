import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./constant";
import Board from "../pages/Board/Board";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthGuard from "../components/AuthGuard";
import Unauthorized from "../pages/Unauthorized";
import { TaskProvider } from "../context/TaskContext";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route
        path={routes.BOARD}
        element={
          <TaskProvider>
            <AuthGuard element={<Board />} />
          </TaskProvider>
        }
      />
      <Route path={routes.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path="*" element={<Navigate to={routes.LOGIN} replace />} />
    </>
  )
);
