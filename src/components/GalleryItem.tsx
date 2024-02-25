import { Box, Text, IconButton, Image } from "@chakra-ui/react";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { BoardType } from "../pages/Gallery";
import { MouseEventHandler } from "react";
import blankImg from "../assets/blank.png";

type GalleryItemProps = {
  board: BoardType;
  onDelete: (boardId: string) => void;
};

const GalleryItem = ({ board, onDelete }: GalleryItemProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onDelete(board._id);
  };
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
        aria-label="Delete Item"
        height={"40px"}
        icon={<RxCross1 />}
        position={"absolute"}
        top={"0"}
        right={"0"}
        onClick={handleDelete}
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
          src={board.content === "" ? blankImg : board.content}
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
