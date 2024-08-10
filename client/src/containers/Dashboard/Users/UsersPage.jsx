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
} from "../../../utils/helperFunctions";
import ProfileCard from "../../../components/ProfileCard";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { DeleteIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import { MdViewList, MdGridView } from "react-icons/md";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import qs from "query-string";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UsersPage = () => {
  const height = getAvailableHeight();
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const page = parseInt(query.get("page")) || 1;
  const [search, setSearch] = useState("");
  const [view, setView] = useState(false);
  const { data, isLoading, isError } = useGetAllUsersQuery(
    qs.parse(location.search)
  );
  const qp = {
    page,
    sortField: "firstName",
    sortOrder: "asc",
    search:"",
    gender:"",
  };
  const [queryParams, setQueryParams] = useState(qp);
  useEffect(()=>{
   const id= setTimeout(() => {
      navigate(`?search=${search}`)
    }, 500);
    return ()=> clearTimeout(id)
  },[])

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const { users, limit, totalPages, totalUsers } = data?.data ?? {};

  if (isLoading) return <Loading />;
  if (isError) return <Error message={"Failed to load users."} />;
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
        flexDir={{ base: "column", sm: "column", md: "row" }}
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
            <IconButton
              icon={<SearchIcon />}
              onClick={() => {
                const currentParams = qs.parse(location.search);
                const params = { ...currentParams, search };
                const url = buildSearchQuery(params);
                navigate(`?${url}`);
              }}
            />
            <Button
              onClick={() => {
                const currentParams = qs.parse(location.search);
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
          flexDir={{ base: "column", sm: "row", md: "row" }}
        >
          <Heading as={"h3"} fontSize={"x-large"}>
            Filter
          </Heading>
          <Flex justify={"center"} align={"center"} gap={5}>
            <Select
              name="sortField"
              value={queryParams?.sortField}
              onChange={(e) =>{
                setQueryParams({ ...queryParams, sortField: e.target.value })
                console.log('e.target.value', e.target.value)
              }}
            >
              <option value="firstName">Name</option>
              <option value="createdAt">Joining Date</option>
            </Select>

            <Select
              name="gender"
              value={queryParams?.gender}
              onChange={(e) =>
                setQueryParams({ ...queryParams, gender: e.target.value })
              }
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Flex>
              <IconButton
                onClick={() =>
                  setQueryParams({ ...queryParams, sortOrder: "asc" })
                }
                isDisabled={queryParams?.sortOrder === "asc"}
                icon={<AiOutlineSortAscending />}
              />
              <IconButton
                onClick={() =>
                  setQueryParams({ ...queryParams, sortOrder: "desc" })
                }
                isDisabled={queryParams?.sortOrder === "desc"}
                icon={<AiOutlineSortDescending />}
              />
            </Flex>
          </Flex>
          <Button
            onClick={() => {
              const currentParams = qs.parse(location.search);
              console.log("currentParams", currentParams);
              const params = { ...currentParams, ...queryParams };
              console.log("queryParams", queryParams);
              const url = buildSearchQuery(params);
              navigate(`?${url}`);
            }}
          >
            Filter
          </Button>
          <Button onClick={() => navigate("?page=1")}>Reset Filter</Button>
        </Flex>
      </Flex>
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
                      <Button
                        leftIcon={<DeleteIcon />}
                        colorScheme="red"
                        size={"sm"}
                        isLoading={deleteUserLoading}
                        loadingText="Deleting"
                        onClick={deleteUser}
                      >
                        Delete User
                      </Button>
                      <Button
                        leftIcon={<ViewIcon />}
                        colorScheme="blue"
                        size={"sm"}
                      >
                        View Profile
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
                    <Td textTransform={"capitalize"}>
                      {user?.firstName} {user?.lastName}
                    </Td>
                    <Td>{user?.email}</Td>
                    <Td>{moment(user?.createdAt).format("L")}</Td>
                    <Td minW={125}>
                      <Flex justify={"space-evenly"}>
                        <Box>
                          <Button
                            display={{
                              base: "none",
                              sm: "none",
                              md: "none",
                              lg: "block",
                            }}
                            leftIcon={<DeleteIcon />}
                            colorScheme="red"
                            size={"sm"}
                            p={1}
                            isLoading={deleteUserLoading}
                            loadingText="Deleting"
                            onClick={deleteUser}
                          >
                            Delete User
                          </Button>
                          <IconButton
                            display={{
                              base: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            }}
                            p={1}
                            size={"sm"}
                            colorScheme="red"
                            icon={<DeleteIcon />}
                            isLoading={deleteUserLoading}
                            onClick={deleteUser}
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
                          >
                            View Profile
                          </Button>
                          <IconButton
                            display={{
                              base: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            }}
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
