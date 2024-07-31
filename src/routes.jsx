import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import LogIn from "./containers/Authentication/Login";
import Register from "./containers/Authentication/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./containers/Profile/ProfilePage";
import { EditProfilePage } from "./containers/Profile/EditProfilePage";
import Layout from "./components/Layout";
import Projects from "./containers/Projects/Projects";
import Dashboard from "./containers/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit",
        element: (
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
