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
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/auth";
import logo from "/logo.png";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Topbar() {
  const user = useSelector(state=>state?.auth?.currentUser) ?? {};
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoutUser, { isLoading: logoutLoading }] = useLogoutMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <Box
      id="topbar"
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      pos={"sticky"}
      top={0}
      zIndex={99}
    >
      <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link to={"/"}>
            <Image w={100} src={logo} alt={"logo"} />
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/contact"}>Contact</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
            {user?.userRole === "admin" && (
              <>
                <NavLink to={"/dashboard"}>Dashboard</NavLink>
                <NavLink to={"/dashboard/users?page=1"}>Users</NavLink>
                <NavLink to={"/dashboard/projects?page=1"}>Projects</NavLink>
              </>
            )}
          </HStack>
        </HStack>
        <Flex minW={100} justify={"space-between"} alignItems={"center"}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
            >
              <Avatar size={"sm"} src={user?.avatar?.secure_url} />
            </MenuButton>
            {user?._id ? (
              <MenuList>
                <MenuItem textTransform={"capitalize"}>
                  {user?.firstName} {user?.lastName}
                </MenuItem>
                <MenuItem>{user?.email}</MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Button
                    onClick={handleLogout}
                    isLoading={logoutLoading}
                    loadingText="Loging out"
                  >
                    Logout
                  </Button>
                </MenuItem>
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
        <Box ref={menuRef} pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <NavLink onClick={onClose} to={"/about"}>
              About
            </NavLink>
            <NavLink onClick={onClose} to={"/contact"}>
              Contact
            </NavLink>
            <NavLink onClick={onClose} to={"/profile"}>
              Profile
            </NavLink>
            {user?.userRole === "admin" && (
              <>
                <NavLink onClick={onClose} to={"/dashboard"}>
                  Dashboard
                </NavLink>
                <NavLink onClick={onClose} to={"/dashboard/users"}>
                  Users
                </NavLink>
                <NavLink onClick={onClose} to={"/dashboard/projects"}>
                  Projects
                </NavLink>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
