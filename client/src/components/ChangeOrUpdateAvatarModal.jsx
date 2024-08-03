import React, { useState } from "react";
import {
  Button,
  Center,
  Image,
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
import { useUploadAvatarMutation } from "../services/profile";

const ChangeOrUpdateAvatarModal = ({avatarUrl}) => {
  const [uploadAvatar] = useUploadAvatarMutation();
    const [avatar, setAvatar] = useState({
      url: null,
      file: null,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar({ url: reader.result, file });
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      const result = await uploadAvatar(avatar?.file);
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
    <>
      <Button onClick={onOpen}>{avatarUrl ? "Change" : "Upload"}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {avatarUrl ? "Change Avatar" : "Upload Avatar"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
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
    </>
  );
};

export default ChangeOrUpdateAvatarModal;
