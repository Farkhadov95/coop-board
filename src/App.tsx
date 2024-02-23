import { Box } from "@chakra-ui/react";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

function App() {
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [clearBoardKey, setClearBoardKey] = useState<number>(0);

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
      <Board
        currentColor={brushColor}
        currentSize={brushSize}
        clearBoardKey={clearBoardKey}
      />
    </Box>
  );
}

export default App;
