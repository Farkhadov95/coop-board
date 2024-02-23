import { Box } from "@chakra-ui/react";
import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

function App() {
  const [brushColor, setBrushColor] = useState("black");
  const [brushSize, setBrushSize] = useState<number>(5);

  return (
    <Box>
      <Toolbar
        currentSize={brushSize}
        currentColor={brushColor}
        handleSize={setBrushSize}
        handleColor={setBrushColor}
      />
      <Board currentColor={brushColor} currentSize={brushSize} />
    </Box>
  );
}

export default App;
