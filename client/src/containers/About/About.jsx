import { Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getAvailableHeight } from '../../utils/helperFunctions';

const About = () => {
  const height = getAvailableHeight();

  return (
    <Stack minH={height}>
      <Heading as={"h2"} my={5} textAlign={"center"} w={200} mx={"auto"}>
        About Us
      </Heading>
      <Text m={5} textAlign={"center"} fontSize={"larger"} color={"grey"}>
        E Manager is a leading innovative software solutions designed to
        streamline employee management and project execution. Our platform
        empowers businesses of all sizes to optimize their workforce, enhance
        collaboration, and achieve project success. With a focus on
        user-friendly technology and data-driven insights, we offer a
        comprehensive suite of tools that simplify complex processes and drive
        operational efficiency. Our mission is to be your trusted partner in
        transforming the way you manage your team and projects. We will ensure
        that you have the best tools to manage your team and projects effectively.
      </Text>
    </Stack>
  );
}

export default About