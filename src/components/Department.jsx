import React from "react";
import data from "../assets/animation/Animation - 1706901325796.json";
import Lottie from "react-lottie";
import { Box } from "@chakra-ui/react";


export default function Department() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
    //   <Box w="25%">
    //     <Lottie 
    //       options={defaultOptions}
        
    //     />
    //   </Box>


    <Text>
       Opthomology
    </Text>
    );
}
