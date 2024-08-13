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
  Switch
} from "@chakra-ui/react";
import TagWithCross from "../../../components/TagWithCross";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/ErrorPage";
import { AddIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Select from "react-select";

const UserDetailPage = () => {
  const param = useParams();
  const id = param?.userId;
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useUserDetailQuery(id);
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectsError,
  } = useGetAllProjectsQuery({page:1});
  const [mode, setMode] = useState("View");
  const user = data?.data?.user;
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    setUserDetails({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      userRole: user?.userRole,
      email: user?.email,
      isAvailable: user?.isAvailable,
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
  const projectOptions = projects?.filter(project=>project.status === 'active')?.map((project) => ({
    _id: project._id,
    name: project.name,
    status: project.status,
    value: project._id,
    label: project.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await updateUser(userDetails);
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
    return <ErrorPage message={userError?.data?.message || projectsError?.data?.message} />;
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
            <FormControl isRequired>
              <FormLabel>Designation</FormLabel>
              <ChakraSelect
                name={"designation"}
                onChange={handleChange}
                value={userDetails?.designation}
                disabled={mode === "View"}
              >
                <option value="associate">Associate</option>
                <option value="senior-associate">Senior Associate</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </ChakraSelect>
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
                  name={"userRole"}
                  onChange={handleChange}
                  value={userDetails?.userRole}
                  disabled={mode === "View"}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </ChakraSelect>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="isAvailable">Availablity:</FormLabel>
                <Switch
                  id="isAvailable"
                  name={"isAvailable"}
                  size={"lg"}
                  isChecked={userDetails?.isAvailable}
                  onChange={(e) =>
                    setUserDetails((prevData) => ({
                      ...prevData,
                      isAvailable: e.target.checked,
                    }))
                  }
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Projects</FormLabel>
              {/* <TagWithCross
                size={"md"}
                array={userDetails?.projects}
                setArray={setUserDetails}
                name={"projects"}
              /> */}
              <HStack>
                <Select
                  styles={styles}
                  value={userDetails?.projects}
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

export default UserDetailPage;
