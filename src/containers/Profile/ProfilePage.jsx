import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useGetCurrentUserQuery } from "../../services/auth";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/ErrorPage";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage message="Failed to load data." />;
  }

  const user = data?.data;

  return (
    <main>
      <Center py={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          {user?.avatar?.secure_url ? (
            <Avatar
              size={"xl"}
              src={user?.avatar?.secure_url}
              mb={4}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
          ) : (
            <Avatar
              size={"xl"}
              src="https://gravatar.com/avatar/4b52a0e01acb0825522bffb0bd2c5923?s=400&d=robohash&r=x"
              mb={4}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
          )}
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
            Actress, musician, songwriter and artist. PM for work inquires or{" "}
            <Text color={"blue.400"}>#tag</Text> me in your posts
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #music
            </Badge>
          </Stack>
          <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              Message
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </Stack>
        </Box>
      </Center>
    </main>
  );
}