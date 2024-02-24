import { Box, Text, IconButton, Image } from "@chakra-ui/react";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { BoardType } from "../pages/Gallery";

type GalleryItemProps = {
  board: BoardType;
};

const GalleryItem = ({ board }: GalleryItemProps) => {
  return (
    <Box
      as={NavLink}
      to={`/board/${board._id}`}
      width={"200px"}
      height={"200px"}
      margin={"25px"}
      boxSizing={"border-box"}
      borderRadius={"10px"}
      border={"2px solid teal"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"end"}
      position={"relative"}
    >
      <IconButton
        colorScheme="teal"
        variant="ghost"
        aria-label="Search database"
        height={"40px"}
        icon={<RxCross1 />}
        position={"absolute"}
        top={"0"}
        right={"0"}
      />
      <Box
        width={"90%"}
        height={"100px"}
        bgColor={"white"}
        borderRadius={"10px"}
        overflow={"hidden"}
        marginX={5}
        marginTop={2}
        marginBottom={3}
      >
        <Image
          width={"100%"}
          height={"100%"}
          src={board.content}
          alt={board.title}
        />
      </Box>
      <Text fontWeight={"bold"} fontStyle={"italic"} marginBottom={5}>
        {board.title}
      </Text>
    </Box>
  );
};

export default GalleryItem;
