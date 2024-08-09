import { Box, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";

const DashboardCard = ({ icon, label, value }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg={useColorModeValue("gray.300","gray.900")}
      textAlign="center"
      w={{ base: 200, sm: 220, md: 300, lg: 350, xl: 400 }}
      m={"auto"}
    >
      <VStack spacing={4}>
        <Icon as={icon} w={100} h={100} color="orange.500" />
        <Text
          color={useColorModeValue("gray.900", "gray.400")}
          fontSize={"xx-large"}
          fontWeight="bold"
        >
          {label}
        </Text>
        <Text
          color={useColorModeValue("gray.900", "gray.400")}
          fontSize={"xx-large"}
          fontWeight="bold"
        >
          {value}
        </Text>
      </VStack>
    </Box>
  );
};
export default DashboardCard;
