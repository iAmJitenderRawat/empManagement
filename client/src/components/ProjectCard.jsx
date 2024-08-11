import { Badge, Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

const ProjectCard = ({project, children}) => {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      m={"auto"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
      textTransform={"capitalize"}
    >
      <Heading as={"h2"}>{project?.name}</Heading>
      <Text>{project?.description}</Text>
      <Text>Status: {project?.status}</Text>
      <Text>Priority:{project?.priority}</Text>
      <Text>Project-Lead: {project?.projectLead}</Text>
      <Text>Project-Manager: {project?.projectManager}</Text>
      <Text>Start-Date: {project?.startDate}</Text>
      <Text>Due-Date: {project?.startDate}</Text>
      <Flex
        flexWrap={"wrap"}
        align={"center"}
        justify={"center"}
        direction={"row"}
        my={2}
        gap={2}
      >
        {project?.teamMembers?.length > 0 ? (
          project?.teamMembers?.map((member, i) => (
            <Badge
              key={i + member}
              px={2}
              py={1}
              color={"black"}
              bg={"greenyellow"}
              fontWeight={"400"}
            >
              <Link to={`/dashboard/users?search=${member}`} >
              #{member}
              </Link>
            </Badge>
          ))
        ) : (
          <Badge
            px={2}
            py={1}
            color={"black"}
            bg={"greenyellow"}
            fontWeight={"400"}
          >
            #NO MEMBER
          </Badge>
        )}
      </Flex>
      {children}
    </Box>
  );
}

export default ProjectCard