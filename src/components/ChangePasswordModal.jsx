import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useChangePasswordMutation } from "../services/profile";

const ChangePasswordModal = () => {
  const [changePassword,{isLoading}] = useChangePasswordMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast=useToast();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangePassword = async () => {
    try {
      const result = await changePassword(password);
      toast({
        position: "top",
        title: result?.data?.message ?? result.error?.data?.message,
        status: result?.data?.status ?? result.error?.data?.status,
        duration: 2000,
        isClosable: true,
      });
      if(result.data.code===200){
        onClose();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Button
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"red.500"}
        _hover={{
          bg: "red.400",
        }}
        onClick={onOpen}
      >
        Change Password
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="oldPassword" isRequired>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                name="oldPassword"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="newPassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                name="newPassword"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={isLoading} loadingText="Changing" variant="ghost" onClick={handleChangePassword}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
