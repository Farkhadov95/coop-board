import {
  Box,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { VscClearAll } from "react-icons/vsc";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

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
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      border={"2px solid teal"}
    >
      <NavLink to={"/"}>
        <Logo />
      </NavLink>
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
