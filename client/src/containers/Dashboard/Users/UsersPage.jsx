import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
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
  useQuery,
} from "../../../utils/helperFunctions";
import ProfileCard from "../../../components/ProfileCard";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { AddIcon, DeleteIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import { MdViewList, MdGridView } from "react-icons/md";
import {IoFemaleSharp, IoMaleSharp } from "react-icons/io5";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import qs from "query-string";
import DeleteModal from "../../../components/SimpleModal";
import ErrorPage from "../../../components/ErrorPage";

const UsersPage = () => {
  const height = getAvailableHeight();
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const page = parseInt(query.get("page")) || 1;
  const searchText = query.get("search") || "";
  const [search, setSearch] = useState("");
  const [view, setView] = useState(false);
  const { data, isLoading, isError, error } = useGetAllUsersQuery(
    qs.parse(location.search)
  );
  const qp = {
    page,
    sortField: "firstName",
    sortOrder: "asc",
    search: "",
    gender: "",
    designation: "",
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
  const { users, limit, totalPages, totalUsers } = data?.data ?? {};

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage message={error?.data?.message || "Failed to load users."} />;
  return (
    <Box minH={height}>
      <Flex justify={"space-around"} align={"center"}>
        {users?.length >= limit ? (
          <Text>
            {users?.length * page} of {totalUsers} users
          </Text>
        ) : (
          <Text>{users?.length} users</Text>
        )}
        <Heading textAlign={"center"} m={5} as={"h2"} fontSize={"xx-large"}>
          Users
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
              value={search || searchText}
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
          <Flex justify={"center"} align={"center"} gap={5}>
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
              <option value="firstName">Name</option>
              <option value="createdAt">Joining Date</option>
            </Select>
            <Select
              name="gender"
              value={queryParams?.gender}
              onChange={(e) => {
                setQueryParams({
                  ...queryParams,
                  gender: e.target.value,
                  page: 1,
                });
                const params = {
                  ...queryParams,
                  gender: e.target.value,
                  page: 1,
                };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </Flex>
          <Flex gap={5}>
            <Select
              name="designation"
              value={queryParams?.designation}
              onChange={(e) => {
                setQueryParams({
                  ...queryParams,
                  designation: e.target.value,
                  page: 1,
                });
                const params = {
                  ...queryParams,
                  designation: e.target.value,
                  page: 1,
                };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            >
              <option value="">Designation</option>
              <option value="associate">Associate</option>
              <option value="senior-associate">Senior Associate</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
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
            px={5}
            colorScheme={"red"}
            onClick={() => {
              setSearch("");
              setQueryParams(qp)
              navigate("?page=1");
            }}
          >
            Reset Filter
          </Button>
        </Flex>
      </Flex>

      <Box px={5}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={() => navigate("/dashboard/users/add")}
        >
          Add User
        </Button>
      </Box>
      {view ? (
        <SimpleGrid
          m={"2em"}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
        >
          {users?.length > 0 ? (
            users?.map((user) => (
              <Box key={user._id}>
                <ProfileCard
                  user={user}
                  children={
                    <Flex justify={"space-evenly"}>
                      <DeleteModal
                        icon={<DeleteIcon />}
                        userId={user?._id}
                        isLoading={deleteUserLoading}
                        loadingText="Deleting"
                        handleDelete={deleteUser}
                        btnText={"Delete"}
                        title={"Delete"}
                        body={`Are you sure you want to delete ${user?.firstName} ${user?.lastName ?? ""} ?`}
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
                          navigate(`/dashboard/users/${user?._id}`)
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
              No User Found
            </Text>
          )}
        </SimpleGrid>
      ) : (
        <TableContainer mb={10}>
          <Table variant="striped">
            {users?.length > 0 && (
              <Thead>
                <Tr>
                  <Th>Sr No</Th>
                  <Th>Avatar</Th>
                  <Th>Name</Th>
                  <Th>Gender</Th>
                  <Th>Email</Th>
                  <Th>Joining Date</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
            )}
            <Tbody>
              {users?.length > 0 ? (
                users?.map((user, i) => (
                  <Tr key={user._id}>
                    <Td>{limit * (page - 1) + (i + 1)}</Td>
                    <Td>
                      <Avatar
                        src={user?.avatar?.secure_url}
                        alt={user?.firstName}
                      />
                    </Td>
                    <Td textTransform={"capitalize"} color={"orange.500"}>
                      {user?.firstName} {user?.lastName}
                    </Td>
                    <Td fontWeight={"bold"}>{user?.gender==="male"? <IoMaleSharp color="blue" />:<IoFemaleSharp color="pink" />}</Td>
                    <Td>{user?.email}</Td>
                    <Td>{moment(user?.createdAt).format("L")}</Td>
                    <Td minW={125}>
                      <Flex justify={"space-evenly"}>
                        <Box>
                          <DeleteModal
                            icon={<DeleteIcon />}
                            userId={user?._id}
                            isLoading={deleteUserLoading}
                            loadingText="Deleting"
                            handleDelete={deleteUser}
                            btnText={"Delete"}
                            title={"Delete User"}
                            body={`Are you sure you want to delete ${user?.firstName} ${user?.lastName ?? ""} ?`}
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
                              navigate(`/dashboard/users/${user?._id}`)
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
                              navigate(`/dashboard/users/${user?._id}`)
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
                  No User Found
                </Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {(users?.length >= limit || page > 1) && (
        <Pagination totalPages={totalPages} page={page} />
      )}
    </Box>
  );
};

export default UsersPage;
