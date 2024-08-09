import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";

const ProfileCard = ({ user, children }) => {
  const bgColor = user?.isAvailable ? "green.300" : "red.500";
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
    >
      <Avatar
        size={"xl"}
        src={user?.avatar?.secure_url}
        mb={4}
        pos={"relative"}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: bgColor,
          border: "2px solid white",
          rounded: "full",
          pos: "absolute",
          bottom: 0,
          right: 3,
        }}
      />
      <Heading
        textTransform={"capitalize"}
        fontSize={"2xl"}
        fontFamily={"body"}
      >
        {user?.firstName} {user?.lastName}
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        {user?.email}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        {user?.bio}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        {user?.gender}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        <Text as={"span"} color={"blue.400"}>
          Joined in{" "}
        </Text>
        {moment(user?.createdAt).format("L")}
      </Text>
      <Text color={"blue.400"}>Hobbies</Text>
      <Flex
        flexWrap={"wrap"}
        align={"center"}
        justify={"center"}
        direction={"row"}
        my={2}
        gap={2}
      >
        {user?.hobbies?.length > 0 ? (
          user?.hobbies?.map((hobby, i) => (
            <Badge
              key={i + hobby}
              px={2}
              py={1}
              color={"black"}
              bg={"greenyellow"}
              fontWeight={"400"}
            >
              #{hobby}
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
            #NO HOBBIES
          </Badge>
        )}
      </Flex>
      {children}
    </Box>
  );
};

export default ProfileCard;
