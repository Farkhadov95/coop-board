import { Heading, Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import animationData from "../assets/paint-animation.json";

const Logo = () => {
  return (
    <Box display={"flex"}>
      <Box height={"80px"} width={"80px"}>
        <Lottie animationData={animationData} />
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
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
  );
};

export default Logo;
