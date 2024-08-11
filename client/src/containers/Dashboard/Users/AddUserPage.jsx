import React, { useEffect, useState } from "react";
import { useQuery } from "../../../utils/helperFunctions";
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
} from "@chakra-ui/react";
import TagWithCross from "../../../components/TagWithCross";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import { AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Select from "react-select";

const AddUserPage = () => {
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useGetAllProjectsQuery();
  const [mode, setMode] = useState("View");
  const user = {
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    hobbies: [],
    projects: [],
  };
  const [userDetails, setUserDetails] = useState(user);

  const avatarUrl = user?.avatar?.secure_url;

  const [hobby, setHobby] = useState("");
  const [addUser, { isLoading: addUserLoading, error: addUserError }] = useAddUserMutation();
  const toast = useToast();
  const projects = projectsData?.data?.projects;
  const [project, setProject] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await addUser(userDetails);
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
  if (addUserLoading || isProjectsLoading) return <Loading />;

  if (addUserError || isProjectsError)
    return <ErrorPage message={addUserError || projectsError?.data?.message} />;
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
            <Box>
              {mode === "View" ? (
                <Button leftIcon={<EditIcon />} onClick={() => setMode("Edit")}>
                  Edit
                </Button>
              ) : (
                <Button leftIcon={<ViewIcon />} onClick={() => setMode("View")}>
                  View
                </Button>
              )}
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
                  disabled={mode === "View"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  name={"lastName"}
                  onChange={handleChange}
                  value={userDetails?.lastName}
                  disabled={mode === "View"}
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
                disabled={mode === "View"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                name={"bio"}
                onChange={handleChange}
                value={userDetails?.bio}
                disabled={mode === "View"}
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
                  disabled={mode === "View"}
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
                  isDisabled={mode === "View"}
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
                  disabled={mode === "View"}
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
                  disabled={mode === "View"}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </ChakraSelect>
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Projects</FormLabel>
              <TagWithCross
                size={"md"}
                array={userDetails?.projects}
                setArray={setUserDetails}
                name={"projects"}
              />
              <HStack>
                {/* <Select
                  onChange={(e) => setProject(e.target.value)}
                  value={project}
                  disabled={mode === "View"}
                >
                  <option value="">Select</option>
                  {projects?.length > 0 &&
                    projects?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                </Select> */}
                <Select
                  defaultValue={userDetails?.projects}
                  isMulti
                  name="projects"
                  options={projects?.map((project) => ({
                    id: project._id,
                    name: project.name,
                    status: project.status,
                    label: project.name,
                  }))}
                  onChange={(e) => setProject(e)}
                  isDisabled={mode === "View"}
                  //   className="basic-multi-select"
                  //   classNamePrefix="select"
                />
                {console.log("userDetails", userDetails)}
                {console.log("project", project)}
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  onClick={() => {
                    if (
                      project !== "" &&
                      userDetails?.projects?.includes(project) === false
                    ) {
                      setUserDetails((prevData) => ({
                        ...prevData,
                        projects: [...userDetails?.projects, project],
                      }));
                      setProject("");
                    }
                  }}
                  isDisabled={mode === "View"}
                >
                  Add
                </Button>
              </HStack>
            </FormControl>
          </Stack>
          <Button
            isLoading={addUserLoading}
            loadingText="Updating"
            colorScheme="blue"
            onClick={handleClick}
            isDisabled={mode === "View"}
          >
            Update Details
          </Button>
        </Stack>
      </Center>
    </main>
  );
};

export default AddUserPage;
