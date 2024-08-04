import React, { useState } from "react";
import { useGetAllUsersQuery } from "../../services/admin";
import { Box, Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import ProfileCard from "../../components/ProfileCard";

const AllUsersPage = () => {
  const [page, setPage]=useState(1)
  const { data, isLoading, isError } = useGetAllUsersQuery(page);
  const { users, currentPage, totalUsers, totalPages } = data?.data ?? {};

  const handlePage=(value)=>{
    setPage(prev=>prev+value);
  }
  return (
    <main>
      <SimpleGrid m={10} columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
        {users?.length > 0 &&
          users?.map((user) => (
            <Box key={user._id}>
              <ProfileCard user={user} children={<div>ggg</div>} />
            </Box>
          ))}
      </SimpleGrid>
      <HStack align={"center"} justify={"center"}>
        <Button
          onClick={() => handlePage(-1)}
          disabled={page === 1}
          colorScheme="blue"
          size="sm"
        >
          Prev
        </Button>
        <Text>
          {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePage(1)}
          disabled={page === totalPages}
          colorScheme="blue"
          size="sm"
        >
          Next
        </Button>
      </HStack>
    </main>
  );
};

export default AllUsersPage;
