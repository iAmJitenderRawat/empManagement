import React, { useState } from "react";
import { useGetAllProjectsQuery } from "../../services/admin";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/ErrorPage";
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { MdGridView, MdViewList } from "react-icons/md";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Projects = () => {
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const { data, isLoading, isError } = useGetAllProjectsQuery(page);
  const [view, setView] = useState(false);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage message={"Failed to load projects"} />;
  }
  const { projects, totalPages, totalProjects, limit } = data.data;
  console.log("projects", projects);
  return (
    <main>
      <Flex justify={"space-around"} align={"center"}>
        <Text>
          {projects?.length * page} of {totalProjects} projects
        </Text>
        <Heading textAlign={"center"} m={5} as={"h2"} fontSize={"xx-large"}>
          Projects
        </Heading>
        <Flex>
          <IconButton
            onClick={() => setView(false)}
            isDisabled={!view}
            icon={<MdViewList />}
          />
          <IconButton
            onClick={() => setView(true)}
            isDisabled={view}
            icon={<MdGridView />}
          />
        </Flex>
      </Flex>
    </main>
  );
};

export default Projects;
