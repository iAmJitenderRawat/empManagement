import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} from "../../services/profile";
import ChangeOrUpdateAvatarModal from "../../components/ChangeOrUpdateAvatarModal";
import TagWithCross from "../../components/TagWithCross";

const EditProfilePage = () => {
  const { data } = useGetCurrentUserQuery();
  const user = data?.data;
  const avatarUrl = user?.avatar?.secure_url;
  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    bio: user?.bio ?? "",
    hobbies: user?.hobbies ?? [],
  });
  const [hobby, setHobby] = useState("");
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await updateUser(userDetails);
      toast({
        position: "top",
        title: result?.data?.message ?? result.error?.data?.message,
        status: result?.data?.status ?? result.error?.data?.status,
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "top",
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <main>
      <Center
        maxW={{ base: 250, sm: 350, md: 450, lg: 550 }}
        mx={"auto"}
        my={10}
      >
        <Stack>
          <HStack justify={"space-between"} align={"center"}>
            <Box>
              <Avatar
                bg={"blue.400"}
                border={"2px solid white"}
                rounded={"full"}
                size={"2xl"}
                src={avatarUrl}
              />
            </Box>
            <Box>
              <ChangeOrUpdateAvatarModal avatarUrl={avatarUrl} />
            </Box>
          </HStack>
          <Stack>
            <HStack flexDir={{ base: "column", sm: "row" }}>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  name={"firstName"}
                  onChange={handleChange}
                  value={userDetails?.firstName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  name={"lastName"}
                  onChange={handleChange}
                  value={userDetails?.lastName}
                />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                name={"email"}
                onChange={handleChange}
                value={userDetails?.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                name={"bio"}
                onChange={handleChange}
                value={userDetails?.bio}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hobbies</FormLabel>
              <TagWithCross
                size={"md"}
                hobbies={userDetails?.hobbies}
                setHobbies={setUserDetails}
              />
              <HStack>
                <Input
                  placeholder="Hobbies"
                  name={"hobby"}
                  onChange={(e) => setHobby(e.target.value.toUpperCase())}
                  value={hobby}
                  onKeyDown={(e) => {
                    if (hobby !== "" && e.key === "Enter") {
                      setUserDetails((prevData) => ({
                        ...prevData,
                        hobbies: [...userDetails?.hobbies, hobby],
                      }));
                      setHobby("");
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (hobby !== "") {
                      setUserDetails((prevData) => ({
                        ...prevData,
                        hobbies: [...userDetails?.hobbies, hobby],
                      }));
                      setHobby("");
                    }
                  }}
                >
                  Add
                </Button>
              </HStack>
            </FormControl>
          </Stack>
          <Button
            isLoading={updateUserLoading}
            loadingText="Updating"
            onClick={handleClick}
          >
            Update Details
          </Button>
        </Stack>
      </Center>
    </main>
  );
};
export default EditProfilePage;