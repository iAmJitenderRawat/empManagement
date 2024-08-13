import React, { useEffect, useState } from "react";
import { styles, useQuery } from "../../../utils/helperFunctions";
import {
  useAddUserMutation,
  useGetAllProjectsQuery,
  useUpdateUserMutation,
  useUserDetailQuery,
} from "../../../services/admin";
import { useNavigate, useParams } from "react-router-dom";
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
  Select as ChakraSelect,
  Stack,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import TagWithCross from "../../../components/TagWithCross";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Select from "react-select";

const AddProjectPage = () => {
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useGetAllProjectsQuery({page:1});

  const user = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    designation: "",
    bio: "",
    hobbies: [],
    projects: [],
    password: "",
  };
  const [userDetails, setUserDetails] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const avatarUrl = user?.avatar?.secure_url;

  const [hobby, setHobby] = useState("");
  const [addUser, { isLoading: addUserLoading, error: addUserError }] =
    useAddUserMutation();
  const toast = useToast();
  const projects = projectsData?.data?.projects;
  const projectOptions = projects
    ?.filter((project) => project.status === "active")
    ?.map((project) => ({
      _id: project._id,
      name: project.name,
      status: project.status,
      value: project._id,
      label: project.name,
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await addUser(userDetails);
      if (result?.data?.code === 201) {
        setUserDetails(user);
      }
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
  if (isProjectsLoading) return <Loading />;

  if (addUserError || isProjectsError)
    return (
      <ErrorPage
        message={addUserError?.data?.message || projectsError?.data?.message}
      />
    );
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
              <FormLabel>Gender</FormLabel>
              <ChakraSelect
                name={"gender"}
                onChange={handleChange}
                value={userDetails?.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </ChakraSelect>
            </FormControl>
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
              <FormLabel>Designation</FormLabel>
              <ChakraSelect
                name={"designation"}
                onChange={handleChange}
                value={userDetails?.designation}
              >
                <option value="">Select Designation</option>
                <option value="associate">Associate</option>
                <option value="senior-associate">Senior Associate</option>
                <option value="manager">Manager</option>
                <option value="director">Director</option>
              </ChakraSelect>
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                name={"bio"}
                onChange={handleChange}
                value={userDetails?.bio}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Hobbies</FormLabel>
              <TagWithCross
                size={"md"}
                array={userDetails?.hobbies}
                setArray={setUserDetails}
                name={"hobbies"}
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
                  leftIcon={<AddIcon />}
                  colorScheme="green"
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
            <HStack>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <ChakraSelect
                  name={"role"}
                  onChange={handleChange}
                  value={userDetails?.role}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </ChakraSelect>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <ChakraSelect
                  name={"isAvailable"}
                  onChange={handleChange}
                  value={userDetails?.isAvailable}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </ChakraSelect>
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Projects</FormLabel>
              <Select
                styles={styles}
                // defaultValue={userDetails?.projects}
                isMulti={true}
                placeholder="Select Projects"
                name="projects"
                options={projectOptions}
                onChange={(e) =>
                  setUserDetails((prevData) => ({
                    ...prevData,
                    projects: [...e],
                  }))
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name={"password"}
                  onChange={handleChange}
                  value={userDetails?.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant={"ghost"}
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Button
            isLoading={addUserLoading}
            loadingText="Updating"
            colorScheme="blue"
            onClick={handleClick}
          >
            Create User
          </Button>
        </Stack>
      </Center>
    </main>
  );
};


export default AddProjectPage