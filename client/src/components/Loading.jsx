// Loading.js
import React from "react";
import "./../App.css";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      className="loading"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        className="loadingio-spinner-pulse-2by998twmg8"
      >
        <Box className="ldio-yzaezf3dcmj">
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
