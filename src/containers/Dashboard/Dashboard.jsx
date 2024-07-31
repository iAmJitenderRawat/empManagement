import React from 'react'
import { useGetAllUsersQuery } from '../../services/admin'

const Dashboard = () => {
  const {data}=useGetAllUsersQuery();
  console.log('data', data)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard