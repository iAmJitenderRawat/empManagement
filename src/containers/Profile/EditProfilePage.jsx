import React, { useState } from "react";
import { useGetCurrentUserQuery } from "../../services/auth";
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
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from "../../services/profile";

export const EditProfilePage = () => {
  const { data } = useGetCurrentUserQuery();
  const user = data?.data;
  const avatarUrl = user?.avatar?.secure_url;
  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });
  const [avatar, setAvatar] = useState({
    url: null,
    file: null,
  });
  const [updateUser] = useUpdateUserMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleClick = async () => {
    try {
      const result = await updateUser(userDetails);
      console.log("res", result);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar({ url: reader.result, file });
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    console.log('avatar?.file', avatar?.file)
    try {
      const result = await uploadAvatar(avatar?.file);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <main>
      <Center>
        <Stack mt={10}>
          <Flex justify={"space-between"} align={"center"}>
            <Box w={250}>
              {console.log(user)}
              {!!avatarUrl ? (
                <Avatar
                  bg={"blue.400"}
                  border={"2px solid white"}
                  rounded={"full"}
                  size={"3xl"}
                  src={avatarUrl}
                />
              ) : (
                <Avatar
                  bg={"blue.400"}
                  border={"2px solid white"}
                  rounded={"full"}
                  size={"3xl"}
                  src="https://gravatar.com/avatar/4b52a0e01acb0825522bffb0bd2c5923?s=400&d=robohash&r=x"
                />
              )}
            </Box>
            <Box>
              <Button onClick={onOpen}>
                {avatarUrl ? "Change" : "Upload"}
              </Button>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    {avatarUrl ? "Change Avatar" : "Upload Avatar"}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {avatar?.url && (
                      <Center m={10}>
                        <Image src={avatar?.url} alt={avatar?.url} w={200} />
                      </Center>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variant="ghost" onClick={handleUpload}>
                      Save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
          <Stack>
            <HStack>
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
          </Stack>
          <Button onClick={handleClick}>Update Details</Button>
        </Stack>
      </Center>
    </main>
  );
};
