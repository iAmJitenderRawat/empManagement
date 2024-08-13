import { useColorModeValue } from "@chakra-ui/react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function getAvailableHeight() {
  const windowHeight =
    window?.innerHeight || document?.documentElement?.clientHeight;
  const topbarHeight = document?.getElementById("topbar")?.offsetHeight; // Replace with your topbar id
  const footerHeight = document?.getElementById("footer")?.offsetHeight; // Replace with your footer id

  const availableHeight = windowHeight - topbarHeight - footerHeight;

  return availableHeight;
}

export const buildSearchQuery = (filters) => {
  const baseQuery = {
    page: 1,
  };

  const searchParams = {
    ...baseQuery,
  };

  // Handle complex data structures
  for(let key in filters){
    if (filters[key]) {
      searchParams[key] = filters[key];
    }
  }

  const queryStringified = queryString.stringify(searchParams);
  return queryStringified;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const styles = {
  container: (baseStyles, state) => ({
    ...baseStyles,
    width: "100%",
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: useColorModeValue("gray.200", "gray.700"),
    borderColor: useColorModeValue("gray.200", "gray.700"),
    "&:hover": {
      borderColor: useColorModeValue("gray.300", "gray.600"),
      backgroundColor: useColorModeValue("blue.300", "blue.600"),
    },
    "&:focus": {
      borderColor: useColorModeValue("gray.300", "gray.600"),
    },
    "&:active": {
      borderColor: useColorModeValue("gray.300", "gray.600"),
    },
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: useColorModeValue("#F7FAFC", "#2d3748"),
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    color: state.isSelected
      ? useColorModeValue("#F7FAFC", "#2d3748")
      : state.isFocused
        ? useColorModeValue("#F7FAFC", "#2d3748")
        : useColorModeValue("#2d3748", "#F7FAFC"),
    backgroundColor: state.isSelected
      ? useColorModeValue("#1967d2", "#99c8ff")
      : state.isFocused
        ? useColorModeValue("#1967d2", "#99c8ff")
        : useColorModeValue("#F7FAFC", "#2d3748"),
    "&:hover": {
      backgroundColor: useColorModeValue("#1967d2", "#99c8ff"),
    },
  }),
};
