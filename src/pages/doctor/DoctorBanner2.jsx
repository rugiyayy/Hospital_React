import React from "react";
import { Link } from "react-router-dom";
import { Helper } from "../../components/Helper";
import { Box, Container, Text } from "@chakra-ui/react";
import { Section } from "@react-email/components";
import { colors } from "../../components/Constants";

const Banner2 = () => {
  return (
    <Section>
      <Box bgPosition="center" bgRepeat="no-repeat"
      >
        <Container maxW="80%">
          <Box
          
            padding="5rem 0"
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Box
              position="realiteve"
              _before={{
                content: `" "`,
                position: "absolute",
                width: "3%",
                borderTop: "4px solid #e12454",
              }}
              width="73%"
              
              

            //   backdropFilter='auto' backdropBlur='10px'
            >
              <Text
                paddingTop="16px"
                as="h1"
                fontSize="60"
                fontWeight="bold"
                lineHeight="1.2"
              >
                We are pleased to offer you
                <Text
                  paddingLeft="16px"
                  as="span"
                  color={colors.secondary}
                  fontSize="60"
                  fontWeight="bold"
                  lineHeight="1.2"
                >
                  the chance to have the healthy
                </Text>
              </Text>
            </Box>

            <div>
              <Link to="/appointment">
                <Helper
                  text="Get appointment"
                  bgColor={colors.primary}
                  bgHover={colors.secondary}
                  fontSize="12px"
                />
              </Link>
            </div>
          </Box>
        </Container>
      </Box>
    </Section>
  );
};

export default Banner2;
