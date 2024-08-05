import { Heading, Text } from '@chakra-ui/react'
import React from 'react'

const About = () => {
  return (
    <main>
      <Heading m={5} textAlign={"center"}>
        About Us
      </Heading>
      <Text m={5} textAlign={"center"}>
        E Manager is a leading innovative software
        solutions designed to streamline employee management and project
        execution. Our platform empowers businesses of all sizes to optimize
        their workforce, enhance collaboration, and achieve project success.
        With a focus on user-friendly technology and data-driven insights, we
        offer a comprehensive suite of tools that simplify complex processes and
        drive operational efficiency. Our mission is to be your trusted partner
        in transforming the way you manage your team and projects.
      </Text>
    </main>
  );
}

export default About