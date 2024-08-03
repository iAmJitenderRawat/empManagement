import {
  Heading,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LandingPage() {

  return (
    <>
      <main>
        <Center py={6}>
          <Heading
            fontSize={40}
            fontWeight={700}
            color={useColorModeValue("white", "gray.400")}
          >
            Welcome to Company
          </Heading>
        </Center>
      </main>
    </>
  );
}
