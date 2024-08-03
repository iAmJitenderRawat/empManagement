import React from "react";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/profile";
import Loading from "./Loading";

const Layout = () => {
  const { data, isLoading, isError } = useGetCurrentUserQuery();
  if (isLoading) {
    return <Loading />;
  }

  const user = data?.data;
  return (
    <>
      <Topbar user={user} />
      <Outlet />
    </>
  );
};

export default Layout;
