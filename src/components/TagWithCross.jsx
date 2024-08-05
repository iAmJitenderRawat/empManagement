import { TagCloseButton, TagLabel, Tag, Flex } from "@chakra-ui/react";
import React from "react";

const TagWithCross = ({ size, hobbies, setHobbies }) => {
  const handleDelete = (ind) => {
    setHobbies((prev) => ({
      ...prev,
      hobbies: hobbies.filter((_, index) => index !== ind),
    }));
  };
  return (
    <Flex flexWrap={"wrap"}>
      {hobbies?.length > 0 &&
        hobbies?.map((tag, ind) => (
          <Tag
            m={1}
            key={tag + ind}
            size={size}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleDelete(ind)} />
          </Tag>
        ))}
    </Flex>
  );
};

export default TagWithCross;
