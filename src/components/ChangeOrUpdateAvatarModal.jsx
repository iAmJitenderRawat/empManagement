import React, { useState } from "react";
import {
  Button,
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
    console.log("avatar?.file", avatar?.file);
    try {
      const result = await uploadAvatar(avatar?.file);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
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
