import React from "react";
import { useGetAllProjectsQuery, useGetAllUsersQuery } from "../../services/admin";
import Loading from "../../components/Loading";
import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import DashboardCard from "../../components/DashboardCard";; 
import { ImUsers } from "react-icons/im";
import { AiOutlineProject } from "react-icons/ai";
import { Link } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage";

const Dashboard = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery({page:1});
  const { totalUsers } = users?.data ?? {};
  const {
    data: projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
  } = useGetAllProjectsQuery({page:1});
  const { totalProjects } = projects?.data ?? {};

  if (isLoadingUsers || isLoadingProjects) {
    return <Loading />;
  }
  if(isErrorUsers||isErrorProjects){
    return <ErrorPage message={"Failed to load data."} />
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
          <Link to={"/dashboard/users?page=1"}>
            <DashboardCard icon={ImUsers} label="Users" value={totalUsers} />
          </Link>
          <Link to={"/dashboard/projects?page=1"}>
            <DashboardCard
              icon={AiOutlineProject}
              label="Projects"
              value={totalProjects}
            />
          </Link>
        </SimpleGrid>
      </Box>
    </main>
  );
};

export default Dashboard;
