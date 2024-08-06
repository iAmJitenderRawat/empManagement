import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";

export default function Contact() {
  const color = useColorModeValue("black", "white");
  return (
    <Center m={5}>
      <Box
        bg={useColorModeValue("#9DC4FB", "gray.800")}
        mt={0}
        overflow={"hidden"}
      >
        <Flex
          bg={useColorModeValue("#02054B", "gray.900")}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Box p={4}>
            <Heading textAlign={"center"}>Contact</Heading>
            <Text
              as={"p"}
              textAlign={"center"}
              mt={{ sm: 3, md: 3, lg: 5 }}
              color="gray.300"
            >
              Fell free to contact
            </Text>
            <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
              <VStack spacing={3} alignItems="flex-start">
                <Flex
                w={"full"}
                  justify={{base:"center",sm:"flex-start"}}
                  align={"center"}
                  flexDir={{ base: "column", sm: "row" }}
                  p={2}
                >
                  <MdPhone color="#1970F1" size="20px" />
                  <Box mx={2} color="#DCE2FF">
                    +91-9888830810
                  </Box>
                </Flex>
                <Flex
                w={"full"}
                  justify={{base:"center",sm:"flex-start"}}
                  align={"center"}
                  flexDir={{ base: "column", sm: "row" }}
                  p={2}
                >
                  <MdEmail color="#1970F1" size="20px" />
                  <Box mx={2} color="#DCE2FF">
                    Jitenderrawat39@gmail.com
                  </Box>
                </Flex>
                <Flex
                w={"full"}
                  justify={{base:"center",sm:"flex-start"}}
                  align={"center"}
                  flexDir={{ base: "column", sm: "row" }}
                  p={2}
                >
                  <MdLocationOn color="#1970F1" size="20px" />
                  <Box mx={2} color="#DCE2FF">
                    Punjab, India
                  </Box>
                </Flex>
              </VStack>
            </Box>
            <Flex
              mt={{ lg: 10, md: 10 }}
              spacing={5}
              px={5}
              align="center"
              justify={"space-around"}
            >
              <IconButton
                aria-label="facebook"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#0D74FF" }}
                icon={<MdFacebook color="white" size="28px" />}
              />
              <IconButton
                aria-label="github"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#0D74FF" }}
                icon={<BsGithub color="white" size="28px" />}
              />
              <IconButton
                aria-label="discord"
                variant="ghost"
                size="lg"
                isRound={true}
                _hover={{ bg: "#0D74FF" }}
                icon={<BsDiscord color="white" size="28px" />}
              />
            </Flex>
          </Box>
          <Box bg={useColorModeValue("white", "gray.700")} borderRadius="lg">
            <Box m={8} color="#0B0E3F">
              <VStack spacing={5}>
                <FormControl id="name">
                  <FormLabel color={color}>Your Name</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <BsPerson color={color} />
                    </InputLeftElement>
                    <Input
                      color={color}
                      type="text"
                      size="md"
                      placeholder="Name"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="name">
                  <FormLabel color={color}>Email</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineEmail color={color} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      size="md"
                      placeholder="Email"
                      color={color}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="name">
                  <FormLabel color={color}>Message</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    _hover={{
                      borderRadius: "gray.300",
                    }}
                    placeholder="Message"
                    color={color}
                  />
                </FormControl>
                <FormControl id="name" float="right">
                  <Button
                    variant="solid"
                    bg="#0D74FF"
                    color="white"
                    _hover={{}}
                  >
                    Send Message
                  </Button>
                </FormControl>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}
