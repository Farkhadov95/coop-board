import {
  Box,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

type ToolsProp = {
  currentSize: number;
  currentColor: string;
  handleSize: (size: number) => void;
  handleColor: (color: string) => void;
};

const Toolbar = ({
  currentColor,
  currentSize,
  handleSize,
  handleColor,
}: ToolsProp) => {
  return (
    <Box
      padding={2}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>
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
      <Box display={"flex"} width={"40%"}>
        <Box display={"flex"} paddingX={10} alignItems={"center"}>
          <Text paddingRight={2}>Color:</Text>
          <Input
            type={"color"}
            value={currentColor}
            onChange={(e) => handleColor(e.target.value)}
            width={"70px"}
          />
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Text paddingRight={2}>Size:</Text>
          <Slider
            width={"150px"}
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
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Toolbar;
