import React from "react";
import { useGetAllUsersQuery } from "../../services/admin";
import Loading from "../../components/Loading";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import DashboardCard from "../../components/DashboardCard";; 
import { ImUsers } from "react-icons/im";
import { AiOutlineProject } from "react-icons/ai";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const { users, currentPage, totalUsers, totalPages } = data?.data ?? {};
console.log('users', users)
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
      <Box p={5}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Link to={"users"}>
          <DashboardCard icon={ImUsers} label="Users" value={totalUsers} />
          </Link>
          <DashboardCard
            icon={AiOutlineProject}
            label="Projects"
            value={totalPages}
          />
        </SimpleGrid>
      </Box>
    </main>
  );
};

export default Dashboard;
