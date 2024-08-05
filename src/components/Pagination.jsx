import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ totalPages, page }) => {
  const navigate = useNavigate();
  const handlePage = (value) => {
    navigate(`?page=${page + value}`);
  };
  return (
    <>
      <Box
        display={{
          base: "none",
          sm: "block",
          md: "block",
          lg: "block",
        }}
        m={10}
      >
        <HStack align={"center"} justify={"center"}>
          <IconButton
            icon={<ArrowLeftIcon />}
            onClick={() => navigate("?page=1")}
            variant="ghost"
          />
          <IconButton
            icon={<ChevronLeftIcon boxSize={7} />}
            onClick={() => handlePage(-1)}
            isDisabled={page === 1}
            colorScheme="blue"
            variant="ghost"
          />
          <Flex>
            {page - 3 >= 1 && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page - 3}`)}
                mx={2}
              >
                {page - 3}
              </Button>
            )}
            {page - 2 >= 1 && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page - 2}`)}
                mx={2}
              >
                {page - 2}
              </Button>
            )}
            {page - 1 >= 1 && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page - 1}`)}
                mx={2}
              >
                {page - 1}
              </Button>
            )}
            <Button rounded={"full"} colorScheme="red">
              {page}
            </Button>
            {page + 1 <= totalPages && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page + 1}`)}
                mx={2}
              >
                {page + 1}
              </Button>
            )}
            {page + 2 <= totalPages && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page + 2}`)}
                mx={2}
              >
                {page + 2}
              </Button>
            )}
            {page + 3 <= totalPages && (
              <Button
                rounded={"full"}
                onClick={() => navigate(`?page=${page + 3}`)}
                mx={2}
              >
                {page + 3}
              </Button>
            )}
          </Flex>
          <IconButton
            icon={<ChevronRightIcon boxSize={7} />}
            onClick={() => handlePage(1)}
            isDisabled={page === totalPages}
            colorScheme="blue"
            variant="ghost"
          />
          <IconButton
            icon={<ArrowRightIcon />}
            onClick={() => navigate(`?page=${totalPages}`)}
            variant="ghost"
          />
        </HStack>
      </Box>
      {/* ****************************************************************************      */}
      <Box
        display={{
          base: "block",
          sm: "none",
          md: "none",
          lg: "none",
        }}
      >
        <Flex align="center" justify="center" p={4}>
          <IconButton
            icon={<ArrowLeftIcon />}
            onClick={() => navigate("?page=1")}
            variant="ghost"
          />
          <IconButton
            icon={<ChevronLeftIcon boxSize={7} />}
            onClick={() => handlePage(-1)}
            isDisabled={page === 1}
            colorScheme="blue"
            variant="ghost"
          />
          <Button rounded={"full"}>{page}</Button>
          <IconButton
            icon={<ChevronRightIcon boxSize={7} />}
            onClick={() => handlePage(1)}
            isDisabled={page === totalPages}
            colorScheme="blue"
            variant="ghost"
          />
          <IconButton
            icon={<ArrowRightIcon />}
            onClick={() => navigate(`?page=${totalPages}`)}
            variant="ghost"
          />
        </Flex>
      </Box>
    </>
  );
};

export default Pagination;
