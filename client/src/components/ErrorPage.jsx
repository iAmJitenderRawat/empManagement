// ErrorPage.js
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { getAvailableHeight } from "../utils/helperFunctions";
// import { useHistory } from "react-router-dom";

const ErrorPage = ({ message }) => {
//   const history = useHistory();
const height= getAvailableHeight();

  return (
    <Flex height={height} justify={"center"} align={"center"} direction={"column"}>
      <Heading as={"h2"} >ERROR</Heading>
      <Text>{message || "An unexpected error occurred."}</Text>
    </Flex>
  );
};

export default ErrorPage;