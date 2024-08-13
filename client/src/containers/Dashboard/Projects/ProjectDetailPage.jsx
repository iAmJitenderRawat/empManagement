import React, { useEffect, useState } from "react";
import { styles, useQuery } from "../../../utils/helperFunctions";
import {
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
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select as ChakraSelect,
  Stack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import TagWithCross from "../../../components/TagWithCross";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import { AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Select from "react-select";

const ProjectDetailPage = () => {
  const param = useParams();
  const id = param?.userId;
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useProjectDetailQuery(id);
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useGetAllProjectsQuery({ page: 1 });
  const [mode, setMode] = useState("View");
  const user = data?.data?.user;
  const [projectDetails, setProjectDetails] = useState({});
  useEffect(() => {
    setProjectDetails({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      designation: user?.designation,
      bio: user?.bio ?? "",
      hobbies: user?.hobbies ?? [],
      projects: user?.projects ?? [],
    });
  }, [user, isUserLoading]);
  const avatarUrl = user?.avatar?.secure_url;

  const [hobby, setHobby] = useState("");
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();
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
    const { name, value } = e?.target;
    setProjectDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await updateUser(projectDetails);
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
  if (isUserLoading || isProjectsLoading) return <Loading />;

  if (isUserError || isProjectsError)
    return (
      <ErrorPage
        message={userError?.data?.message || projectsError?.data?.message}
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
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  name={"name"}
                  onChange={handleChange}
                  value={projectDetails?.name}
                  disabled={mode === "View"}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <ChakraSelect
                  name={"status"}
                  onChange={handleChange}
                  value={projectDetails?.status}
                  disabled={mode === "View"}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                </ChakraSelect>
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <ChakraSelect
                name={"priority"}
                onChange={handleChange}
                value={projectDetails?.priority}
                disabled={mode === "View"}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </ChakraSelect>
            </FormControl>
            <FormControl>
              <FormLabel>TimeLine</FormLabel>
              <Input
                type="number"
                placeholder="TimeLine (in days)"
                name={"timeline"}
                onChange={handleChange}
                value={projectDetails?.timeline}
                disabled={mode === "View"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Project Lead</FormLabel>
              <ChakraSelect
                name={"projectLead"}
                onChange={handleChange}
                value={projectDetails?.projectLead}
                disabled={mode === "View"}
              >
                <option value="">Associate</option>
                <option value="senior-associate">Senior Associate</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </ChakraSelect>
            </FormControl>
            <FormControl>
              <FormLabel>Hobbies</FormLabel>
              <TagWithCross
                size={"md"}
                array={projectDetails?.hobbies}
                setArray={setProjectDetails}
                name={"hobbies"}
                isDisabled={mode === "View"}
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
                      setProjectDetails((prevData) => ({
                        ...prevData,
                        hobbies: [...projectDetails?.hobbies, hobby],
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
                      setProjectDetails((prevData) => ({
                        ...prevData,
                        hobbies: [...projectDetails?.hobbies, hobby],
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
                  value={projectDetails?.role}
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
                  value={projectDetails?.isAvailable}
                  disabled={mode === "View"}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </ChakraSelect>
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Projects</FormLabel>
              {/* <TagWithCross
                size={"md"}
                array={projectDetails?.projects}
                setArray={setProjectDetails}
                name={"projects"}
              /> */}
              <HStack>
                <Select
                  styles={styles}
                  value={projectDetails?.projects}
                  isMulti={true}
                  placeholder="Select Projects"
                  name="projects"
                  options={projectOptions}
                  onChange={(e) =>
                    setProjectDetails((prevData) => ({
                      ...prevData,
                      projects: [...e],
                    }))
                  }
                  isDisabled={mode === "View"}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </HStack>
            </FormControl>
          </Stack>
          <Button
            isLoading={updateUserLoading}
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

export default ProjectDetailPage