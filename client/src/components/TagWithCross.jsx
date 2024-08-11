import { TagCloseButton, TagLabel, Tag, Flex } from "@chakra-ui/react";
import React from "react";

const TagWithCross = ({ size, array, setArray, name }) => {
  const handleDelete = (ind) => {
    setArray((prev) => ({
      ...prev,
      [name]: array.filter((_, index) => index !== ind),
    }));
  };

  return (
    <Flex flexWrap={"wrap"}>
      {array?.length > 0 &&
        array?.map((tag, ind) => (
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
