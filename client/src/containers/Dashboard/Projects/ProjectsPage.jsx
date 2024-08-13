import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllProjectsQuery,
  useGetAllUsersQuery,
} from "../../../services/admin";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Hide,
  HStack,
  IconButton,
  Input,
  Select,
  Show,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import {
  buildSearchQuery,
  getAvailableHeight,
} from "../../../utils/helperFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { AddIcon, DeleteIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import { MdViewList, MdGridView } from "react-icons/md";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import qs from "query-string";
import DeleteModal from "../../../components/SimpleModal";
import ProjectCard from "../../../components/ProjectCard";
import ErrorPage from "../../../components/ErrorPage";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProjectsPage = () => {
  const height = getAvailableHeight();
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const page = parseInt(query.get("page")) || 1;
  const [search, setSearch] = useState("");
  const [view, setView] = useState(false);
  const { data, isLoading, isError, error } = useGetAllProjectsQuery(
    qs.parse(location.search)
  );

  const { projects, limit, totalPages, totalProjects } = data?.data ?? {};
  const qp = {
    page,
    sortField: "name",
    sortOrder: "asc",
    search: "",
    priority: "",
    status: "",
  };
  const [queryParams, setQueryParams] = useState(qp);

  useEffect(() => {
    const id = setTimeout(() => {
      if (search) navigate(`?search=${search}`);
    }, 500);
    return () => clearTimeout(id);
  }, [search]);

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  if (isLoading) return <Loading />;
  if (isError)
    return <ErrorPage message={error || "Failed to load projects."} />;
  return (
    <Box minH={height}>
      <Flex justify={"space-around"} align={"center"}>
        {projects?.length >= limit ? (
          <Text>
            {projects?.length * page} of {totalProjects} projects
          </Text>
        ) : (
          <Text>{projects?.length} projects</Text>
        )}
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
      <Flex
        m={5}
        align={"center"}
        justify={"space-around"}
        gap={5}
        flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
      >
        <Flex gap={5} justify={"center"} align={"center"}>
          <Heading as={"h3"} fontSize={"x-large"}>
            Search
          </Heading>
          <Flex gap={5} justify={"center"} align={"center"}>
            <Input
              type="text"
              name="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={() => {
                const currentParams = qs.parse(location.search);
                setSearch("");
                const params = { ...currentParams, search: "" };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              Clear
            </Button>
          </Flex>
        </Flex>
        <Flex
          gap={5}
          justify={"center"}
          align={"center"}
          flexDir={{ base: "column", sm: "column", md: "row" }}
        >
          <Heading as={"h3"} fontSize={"x-large"}>
            Filter
          </Heading>
          <Flex
            justify={"center"}
            align={"center"}
            gap={5}
          >
            <Select
              name="sortField"
              value={queryParams?.sortField}
              onChange={(e) => {
                setQueryParams({ ...queryParams, sortField: e.target.value });
                const params = { ...queryParams, sortField: e.target.value };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              <option value="name">Name</option>
              <option value="startDate">Start Date</option>
            </Select>
            <Select
              name="priority"
              value={queryParams?.priority}
              onChange={(e) => {
                setQueryParams({
                  ...queryParams,
                  priority: e.target.value,
                  page: 1,
                });
                const params = {
                  ...queryParams,
                  priority: e.target.value,
                  page: 1,
                };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </Select>
            <Select
              name="status"
              value={queryParams?.status}
              onChange={(e) => {
                setQueryParams({
                  ...queryParams,
                  status: e.target.value,
                  page: 1,
                });
                const params = {
                  ...queryParams,
                  status: e.target.value,
                  page: 1,
                };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Flex>
              <IconButton
                onClick={() => {
                  setQueryParams({ ...queryParams, sortOrder: "asc" });
                  const params = { ...queryParams, sortOrder: "asc" };
                  const url = buildSearchQuery(params);
                  navigate(`?${url}`);
                }}
                isDisabled={queryParams?.sortOrder === "asc"}
                icon={<AiOutlineSortAscending />}
              />
              <IconButton
                onClick={() => {
                  setQueryParams({ ...queryParams, sortOrder: "desc" });
                  const params = { ...queryParams, sortOrder: "desc" };
                  const url = buildSearchQuery(params);
                  navigate(`?${url}`);
                }}
                isDisabled={queryParams?.sortOrder === "desc"}
                icon={<AiOutlineSortDescending />}
              />
            </Flex>
          </Flex>
          <Button
            onClick={() => {
              setSearch("");
              setQueryParams(qp);
              navigate("?page=1");
            }}
          >
            Reset Filter
          </Button>
        </Flex>
      </Flex>
      <Box p={5}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={() => navigate("/dashboard/projects/add")}
        >
          Add Project
        </Button>
      </Box>
      {view ? (
        <SimpleGrid
          m={"2em"}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
        >
          {projects?.length > 0 ? (
            projects?.map((project) => (
              <Box key={project._id}>
                <ProjectCard
                  project={project}
                  children={
                    <Flex justify={"space-evenly"}>
                      <DeleteModal
                        icon={<DeleteIcon />}
                        userId={project?._id}
                        isLoading={deleteUserLoading}
                        loadingText="Deleting"
                        handleDelete={deleteUser}
                        btnText={"Delete User"}
                        title={"Delete"}
                        body={`Are you sure you want to delete ${project?.name}} ?`}
                        btnColorScheme={"red"}
                        actionBtnTitle={"Delete"}
                        actionBtnColorScheme={"red"}
                        btnDisplay={"block"}
                        iconBtnDisplay={"none"}
                      />
                      <Button
                        leftIcon={<ViewIcon />}
                        colorScheme="blue"
                        size={"sm"}
                        onClick={() =>
                          navigate(`/dashboard/users/${project?._id}`)
                        }
                      >
                        View
                      </Button>
                    </Flex>
                  }
                />
              </Box>
            ))
          ) : (
            <Text as={"p"} fontSize={"large"}>
              No Project Found
            </Text>
          )}
        </SimpleGrid>
      ) : (
        <TableContainer mb={10}>
          <Table variant="striped">
            {projects?.length > 0 && (
              <Thead>
                <Tr>
                  <Th>Sr No</Th>
                  <Th>Name</Th>
                  <Th>Status/Priority</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
            )}
            <Tbody>
              {projects?.length > 0 ? (
                projects?.map((project, i) => (
                  <Tr key={project._id}>
                    <Td>{limit * (page - 1) + (i + 1)}</Td>
                    <Td
                      textTransform={"capitalize"}
                      color={"orange.500"}
                      fontWeight={"bold"}
                    >
                      {project?.name}
                    </Td>
                    <Td>
                      {project?.status}/ {project?.priority}
                    </Td>
                    <Td>{moment(project?.startDate).format("L")}</Td>
                    <Td>
                      {moment(project?.startDate)
                        .add(project?.timeline, "days")
                        .format("L")}
                    </Td>
                    <Td minW={125}>
                      <Flex justify={"space-evenly"}>
                        <Box>
                          <DeleteModal
                            icon={<DeleteIcon />}
                            userId={project?._id}
                            isLoading={deleteUserLoading}
                            loadingText="Deleting"
                            handleDelete={deleteUser}
                            btnText={"Delete"}
                            title={"Delete User"}
                            body={`Are you sure you want to delete ${project?.name} ?`}
                            btnColorScheme={"red"}
                            actionBtnTitle={"Delete"}
                            actionBtnColorScheme={"red"}
                            btnDisplay={{
                              base: "none",
                              sm: "none",
                              md: "none",
                              lg: "block",
                            }}
                            iconBtnDisplay={{
                              base: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            }}
                          />
                        </Box>
                        <Box>
                          <Button
                            leftIcon={<ViewIcon />}
                            colorScheme="blue"
                            size={"sm"}
                            display={{
                              base: "none",
                              sm: "none",
                              md: "none",
                              lg: "block",
                            }}
                            onClick={() =>
                              navigate(`/dashboard/projects/${project?._id}`)
                            }
                          >
                            View
                          </Button>
                          <IconButton
                            display={{
                              base: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            }}
                            onClick={() =>
                              navigate(`/dashboard/projects/${project?._id}`)
                            }
                            size={"sm"}
                            colorScheme="blue"
                            icon={<ViewIcon />}
                          />
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Text as={"p"} m={5} fontSize={"large"}>
                  No Project Found
                </Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {(projects?.length >= limit || page > 1) && (
        <Pagination totalPages={totalPages} page={page} />
      )}
    </Box>
  );
};

export default ProjectsPage;
