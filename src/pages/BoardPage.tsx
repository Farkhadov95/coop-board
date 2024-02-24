import { Box } from "@chakra-ui/react";
import Board from "../components/Board";
import Toolbar from "../components/Toolbar";
import { BoardType } from "../pages/Gallery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://coop-board-server.adaptable.app");

const BoardPage = () => {
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [clearBoardKey, setClearBoardKey] = useState<number>(0);
  const [boardData, setBoardData] = useState<BoardType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    socket.emit("getCanvasById", { boardId: id });

    socket.on("canvasData", (data) => {
      setBoardData(data);
    });

    return () => {
      socket.off("boardData");
    };
  }, [id]);

  const clearBoard = () => {
    setClearBoardKey((prev) => prev + 1);
  };
  return (
    <Box>
      <Toolbar
        currentSize={brushSize}
        currentColor={brushColor}
        handleSize={setBrushSize}
        handleColor={setBrushColor}
        clearBoard={clearBoard}
      />
      {boardData && (
        <Board
          currentColor={brushColor}
          currentSize={brushSize}
          clearBoardKey={clearBoardKey}
          boardData={boardData}
        />
      )}
    </Box>
  );
};

export default BoardPage;
