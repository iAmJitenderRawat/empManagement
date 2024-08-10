import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import LogIn from "./containers/Authentication/Login";
import Register from "./containers/Authentication/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./containers/Profile/ProfilePage";
import EditProfilePage from "./containers/Profile/EditProfilePage";
import Layout from "./components/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Contact from "./containers/Contact/Contact";
import About from "./containers/About/About";
import UsersPage from "./containers/Dashboard/Users/UsersPage";
import ProjectsPage from "./containers/Dashboard/Projects/ProjectsPage";
import ErrorPage from "./components/ErrorPage";
import UserDetailPage from "./containers/Dashboard/Users/UserDetailPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },
          {
            path: "users",
            element: <UsersPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "users/:userId",
            element: <UserDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit",
            element: <EditProfilePage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
