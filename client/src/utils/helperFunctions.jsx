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
