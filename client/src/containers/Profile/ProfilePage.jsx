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
import ProfileCard from "../../components/ProfileCard";


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
        <ProfileCard
          user={user}
          children={
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
          }
        />
      </Center>
    </main>
  );
}
