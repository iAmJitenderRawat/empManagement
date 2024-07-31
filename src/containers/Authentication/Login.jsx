import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";

export default function LogIn() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginMutation();
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    try {
      const result = await loginUser(formData);
      toast({
        position: "top",
        title: result?.data?.message ?? result.error?.data?.message,
        status: result?.data?.status ?? result.error?.data?.status,
        duration: 3000,
        isClosable: true,
      });
      console.log("result", result);

      dispatch(setCredentials(result?.data?.data));
      if (result?.data?.code === 200) {
        navigate("/");
      }
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as={"span"} color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleClick}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have account.{" "}
                <Text as={"span"} color={"blue.400"}>
                  <Link to={"/register"}>Create one.</Link>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
