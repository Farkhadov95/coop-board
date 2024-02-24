import { Box, Text } from "@chakra-ui/react";
import { FaRegImage } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const GalleryItem = () => {
  return (
    <Box
      as={NavLink}
      to={"/board"}
      width={"200px"}
      height={"200px"}
      margin={"25px"}
      boxSizing={"border-box"}
      borderRadius={"10px"}
      border={"2px solid teal"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box width={"100px"} marginX={"auto"}>
        <FaRegImage size={"100"} color={"teal"} />
      </Box>
      <Text fontWeight={"bold"} fontStyle={"italic"}>
        Title
      </Text>
    </Box>
  );
};

export default GalleryItem;
