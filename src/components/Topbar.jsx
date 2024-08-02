import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/auth";

export default function Topbar({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
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
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to={"/"}>Logo</Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink to={"#"}>About</NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              {user?.userRole === "admin" && (
                <>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                  <NavLink to={"/projects"}>Projects</NavLink>
                </>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user?.avatar?.secure_url} />
              </MenuButton>
              {user?._id ? (
                <MenuList>
                  <MenuItem textTransform={"capitalize"}>
                    {user?.firstName} {user?.lastName}
                  </MenuItem>
                  <MenuItem>
                    {user?.email}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem onClick={() => navigate("/register")}>
                    Register
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                </MenuList>
              )}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to={"#"}>About</NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              {user?.userRole === "admin" && (
                <>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                  <NavLink to={"/projects"}>Projects</NavLink>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
