import { Box, Button, Input, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";
import GalleryItem from "../components/GalleryItem";
import { MdLibraryAdd } from "react-icons/md";

const Gallery = () => {
  return (
    <Box>
      <Box border={"2px solid teal"}>
        <Logo />
      </Box>
      <Box padding={10} width={"100%"}>
        <Box
          as={"form"}
          display={"flex"}
          width={"600px"}
          margin={"auto"}
          padding={10}
        >
          <Input marginRight={3} border={"2px solid teal"} />
          <Button width={"fit-content"} colorScheme="teal" variant="outline">
            <MdLibraryAdd size={"35"} />
            <Text marginLeft={1}>Create</Text>
          </Button>
        </Box>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          width={"1000px"}
          margin={"auto"}
          marginTop={10}
        >
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
          <GalleryItem />
        </Box>
      </Box>
    </Box>
  );
};

export default Gallery;
