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
import Contact from "./containers/Contact/Contact";

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
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Projects />,
            },
        ]
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            },
        ]
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: (
                <ProfilePage />
            ),
          },
          {
            path: "edit",
            element: (
                <EditProfilePage />
            ),
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      }
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
]);
