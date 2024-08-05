import { Box, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";

const DashboardCard = ({ icon, label, value }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      textAlign="center"
      w={{ base: 200, sm: 220, md: 300, lg: 350, xl: 400 }}
      m={"auto"}
    >
      <VStack spacing={4}>
        <Icon as={icon} w={10} h={10} color="teal.500" />
        <Text
          color={useColorModeValue("gray.500", "gray.900")}
          fontSize="lg"
          fontWeight="bold"
        >
          {label}
        </Text>
        <Text
          color={useColorModeValue("gray.500", "gray.900")}
          fontSize="2xl"
          fontWeight="bold"
        >
          {value}
        </Text>
      </VStack>
    </Box>
  );
};
export default DashboardCard;
