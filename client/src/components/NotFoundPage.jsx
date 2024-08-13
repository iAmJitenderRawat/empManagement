import { Container, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container maxW="xl" py={12}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Heading as="h1" fontSize="4xl" fontWeight="bold" mt={6}>
          Page Not Found
        </Heading>
        <Text mt={4} color="gray.500">
          The page you are looking for could not be found.
        </Text>
        <Button colorScheme="blue" mt={6} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Flex>
    </Container>
  );
}

export default NotFoundPage;
