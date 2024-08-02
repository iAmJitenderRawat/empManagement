import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useGetCurrentUserQuery } from "../../services/profile";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/ErrorPage";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/ChangePasswordModal";

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
      <Center>
        <Heading>Profile</Heading>
      </Center>
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
          {user?.hobbies?.length>0 && <Text color={"blue.400"}>Hobbies</Text>}
          <Flex flexWrap={"wrap"} align={"center"} justify={"center"} direction={"row"} mt={1}>
            {user?.hobbies?.length > 0 &&
              user?.hobbies?.map((hobby, i) => (
                <Badge
                  key={i + hobby}
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  #{hobby}
                </Badge>
              ))}
          </Flex>
          <Stack mt={8} direction={"row"} spacing={4}>
            <ChangePasswordModal />
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
