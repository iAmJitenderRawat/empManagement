import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../services/auth';
import Loading from './Loading';
import ErrorPage from './ErrorPage';

const Layout = () => {
    const { data, isLoading, isError } = useGetCurrentUserQuery();
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <ErrorPage message="Failed to load data." />;
    }

    const user = data?.data;
  return (
    <>
    <Topbar user={user}/>
    <Outlet />
    </>
  )
}

export default Layout