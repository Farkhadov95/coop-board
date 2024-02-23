import {
  Box,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { VscClearAll } from "react-icons/vsc";
import animationData from "../assets/paint-animation.json";
import Lottie from "lottie-react";

type ToolsProp = {
  currentSize: number;
  currentColor: string;
  handleSize: (size: number) => void;
  handleColor: (color: string) => void;
  clearBoard: () => void;
};

const Toolbar = ({
  currentColor,
  currentSize,
  handleSize,
  handleColor,
  clearBoard,
}: ToolsProp) => {
  return (
    <Box
      padding={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"}>
        <Box height={"80px"} width={"80px"}>
          <Lottie animationData={animationData} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Heading
            as={"h2"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            width={"fit-content"}
            fontSize={"20px"}
          >
            Coop
          </Heading>
          <Heading
            as={"h2"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            width={"fit-content"}
            fontSize={"20px"}
            paddingLeft={"10px"}
          >
            Board
          </Heading>
        </Box>
      </Box>
      <Box display={"flex"} width={"40%"}>
        <Box display={"flex"} paddingRight={10} alignItems={"center"}>
          <Text paddingRight={2} fontWeight={"bold"} fontStyle={"italic"}>
            Color:
          </Text>
          <Input
            padding={"2px"}
            type={"color"}
            value={currentColor}
            onChange={(e) => handleColor(e.target.value)}
            width={"40px"}
            height={"40px"}
          />
        </Box>
        <Box display={"flex"} paddingRight={10} alignItems={"center"}>
          <Text paddingRight={2} fontWeight={"bold"} fontStyle={"italic"}>
            Size:
          </Text>
          <Slider
            width={"150px"}
            colorScheme="teal"
            aria-label="slider-ex-1"
            value={currentSize}
            onChange={(e) => handleSize(e)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Clear"
          icon={<VscClearAll />}
          onClick={clearBoard}
        />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Toolbar;
