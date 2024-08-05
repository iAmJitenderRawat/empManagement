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
  const { totalUsers, totalPages } = data?.data ?? {};

  if (isLoading) {
    return <Loading />;
  }
  if(isError){
    return <Error message={"Failed to load data."} />
  }
  return (
    <main>
      <Center>
        <Heading mt={5} as={"h2"}>
          Dashboard
        </Heading>
      </Center>
      <Box m={{ base: 5, sm: 8, md: 12, lg: 20, xl: 50 }}>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={10}>
          <Link to={"users"}>
            <DashboardCard icon={ImUsers} label="Users" value={totalUsers} />
          </Link>
          <Link to={"projects"}>
          <DashboardCard
            icon={AiOutlineProject}
            label="Projects"
            value={totalPages}
            />
            </Link>
        </SimpleGrid>
      </Box>
    </main>
  );
};

export default Dashboard;
