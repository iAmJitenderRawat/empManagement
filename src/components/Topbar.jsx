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

const Links = ["dashboard", "projects", "team"];

// const Navlink = (props) => {
//   const { children } = props;

//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.200", "gray.700"),
//       }}
//       href={"#"}
//     >
//       {children}
//     </Box>
//   );
// };

export default function Topbar({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate=useNavigate();
  const toast = useToast();
  const [logoutUser] = useLogoutMutation();

  const handleLogout =async () => {
    try {
      await logoutUser();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login")
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
              {Links.map((link) => (
                <NavLink key={link} to={`/${link}`}>{link}</NavLink>
              ))}
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
                {user?.avatar?.secure_url ? (
                  <Avatar size={"sm"} src={user?.avatar?.secure_url} />
                ) : (
                  <Avatar
                    size={"sm"}
                    src="https://gravatar.com/avatar/4b52a0e01acb0825522bffb0bd2c5923?s=400&d=robohash&r=x"
                  />
                )}
              </MenuButton>
              {user?._id ? (
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/projects")}>
                    Projects
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
            <Stack as={"nav"} spacing={4} textTransform={"capitalize"}>
              {Links.map((link) => (
                <NavLink key={link} to={`/${link}`}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
