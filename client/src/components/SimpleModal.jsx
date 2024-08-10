import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

function SimpleModal({
  icon,
  userId,
  isLoading,
  loadingText,
  handleDelete,
  btnText,
  btnColorScheme,
  title,
  body,
  actionBtnTitle,
  actionBtnColorScheme,
  btnDisplay,
  iconBtnDisplay,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        display={btnDisplay}
        leftIcon={icon}
        colorScheme={btnColorScheme}
        size={"sm"}
        p={2}
        onClick={onOpen}
      >
        {btnText}
      </Button>
      <IconButton
        display={iconBtnDisplay}
        p={1}
        size={"sm"}
        colorScheme={btnColorScheme}
        icon={icon}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{body}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant={"outline"}>
              Close
            </Button>
            <Button
              variant="ghost"
              isLoading={isLoading}
              loadingText={loadingText}
              onClick={() => handleDelete(userId)}
              colorScheme={actionBtnColorScheme}
            >
              {actionBtnTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default SimpleModal;