import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import LogIn from "./containers/Authentication/Login";
import Register from "./containers/Authentication/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./containers/Profile/ProfilePage";
import EditProfilePage from "./containers/Profile/EditProfilePage";
import Layout from "./components/Layout";
import Projects from "./containers/Projects/Projects";
import Dashboard from "./containers/Dashboard/Dashboard";
import Contact from "./containers/Contact/Contact";
import AllUsersPage from "./containers/Dashboard/AllUsersPage";
import About from "./containers/About/About";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <AllUsersPage />,
          },
          {
            path: "projects",
            element: <Projects />,
          }
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <ProfilePage />,
          },
          {
            path: "edit",
            element: <EditProfilePage />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      }
    ],
  },
]);
