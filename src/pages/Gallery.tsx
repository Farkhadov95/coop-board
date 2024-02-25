import { Box, Button, Input, Text } from "@chakra-ui/react";
import Logo from "../components/Logo";
import GalleryItem from "../components/GalleryItem";
import { MdLibraryAdd } from "react-icons/md";
import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";

export type BoardType = {
  _id: string;
  title: string;
  content: string;
  updatedTime: string;
  createdTime: string;
};

const socket = io("https://coop-board-server.adaptable.app");

const Gallery = () => {
  const [allBoards, setAllBoards] = useState<BoardType[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    socket.emit("getAllBoards");

    socket.on("allBoards", (boards) => {
      setAllBoards(boards);
    });

    socket.on("newCanvas", (createdBoard) => {
      setAllBoards((prevBoards) => [...prevBoards, createdBoard]);
    });

    return () => {
      socket.off("allBoards");
      socket.off("newCanvas");
    };
  }, []);

  useEffect(() => {
    socket.on("clearCanvas", (boardId) => {
      console.log("clearCanvas");
      const updatedBoards = allBoards.map((board) => {
        if (board._id === boardId) {
          return { ...board, content: "" };
        }
        return board;
      });

      setAllBoards(updatedBoards);
    });

    socket.on("canvasDeleted", (deletedBoard) => {
      console.log("canvasDeleted");
      setAllBoards((prevBoards) =>
        prevBoards.filter((board) => board._id !== deletedBoard._id)
      );
    });

    return () => {
      socket.off("clearCanvas");
      socket.off("canvasDeleted");
    };
  }, [allBoards]);

  console.log(allBoards);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = title;
    socket.emit("createCanvas", { title: newTitle });
    setTitle("");
  };

  const handleDeleteBoard = (boardId: string) => {
    socket.emit("deleteCanvas", boardId);

    setAllBoards((prevBoards) =>
      prevBoards.filter((board) => board._id !== boardId)
    );
  };

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
          onSubmit={handleCreate}
        >
          <Input
            name="title"
            marginRight={3}
            border={"2px solid teal"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            width={"fit-content"}
            colorScheme="teal"
            variant="outline"
            type="submit"
          >
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
          {allBoards ? (
            allBoards
              .slice()
              .reverse()
              .map((board) => (
                <GalleryItem
                  key={board._id}
                  board={board}
                  onDelete={handleDeleteBoard}
                />
              ))
          ) : (
            <Text fontSize={"xx-large"} fontWeight={"bold"}>
              No boards to display
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Gallery;
