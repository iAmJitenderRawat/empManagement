import React, { useState } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../services/admin";
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
import ProfileCard from "../../../components/ProfileCard";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { MdViewList, MdGridView } from "react-icons/md";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UsersPage = () => {
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const [view, setView] = useState(false);
  const { data, isLoading, isError } = useGetAllUsersQuery(page);
  const [deleteUser,{isLoading:deleteUserLoading}] = useDeleteUserMutation();
  const { users, limit, totalPages, totalUsers } = data?.data ?? {};

  if (isLoading) {
    return <Loading />;
  }
  if(isError){
    return <Error message={"Failed to load users."} />
  }
  return (
    <main>
      <Flex justify={"space-around"} align={"center"}>
        <Text>
          {users?.length * page} of {totalUsers} users
        </Text>
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
      {view ? (
        <SimpleGrid
          m={"2em"}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
        >
          {users?.length > 0 &&
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
            ))}
        </SimpleGrid>
      ) : (
        <TableContainer mb={10}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Sr No</Th>
                <Th>Avatar</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th textAlign={"center"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.length > 0 &&
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
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Pagination totalPages={totalPages} page={page} />
    </main>
  );
};

export default UsersPage;
