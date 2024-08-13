// ErrorPage.js
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { getAvailableHeight } from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const height = getAvailableHeight();
  const navigate = useNavigate();
  return (
    <Flex
      height={height}
      justify={"center"}
      align={"center"}
      direction={"column"}
    >
      <Heading as={"h2"}>ERROR</Heading>
      <Text p={5}>{message || "An unexpected error occurred."}</Text>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Flex>
  );
};

export default ErrorPage;
