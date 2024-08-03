import React from "react";
import { useGetAllUsersQuery } from "../../services/admin";
import Loading from "../../components/Loading";
import { Center, Heading } from "@chakra-ui/react";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const { users, currentPage, totalUsers, totalPages } = data?.data ?? {};
  console.log("data", data);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Center>
        <Heading mt={5} as={"h2"}>
          Dashboard
        </Heading>
      </Center>
      <div>Users: {totalUsers}</div>
    </main>
  );
};

export default Dashboard;
