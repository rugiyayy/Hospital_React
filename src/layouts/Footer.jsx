import { Flex, Link, Text, Container, VStack, Box } from "@chakra-ui/react";
import { colors } from "../components/Constants";

const footerData = [
  {
    label: "Writing",
    href: "#",
    links: [
      { label: "Digital Garden", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "React", href: "#" },
      { label: "Community", href: "#" },
      { label: "Digital Garden", href: "#" },
     
      { label: "Digital Garden", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "React", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    label: "Art",
    href: "#",
    links: [
      { label: "Design", href: "#" },
      { label: "3D Art", href: "#" },
      { label: "Photography", href: "#" },
      { label: "Design", href: "#" },
      { label: "3D Art", href: "#" },
      { label: "Photography", href: "#" },
      { label: "Design", href: "#" },
      { label: "3D Art", href: "#" },
      { label: "Photography", href: "#" },
    ],
  },
  {
    label: "About",
    href: "#",
    links: [
      { label: "Appearances", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Uses", href: "#" },
      { label: "Appearances", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Uses", href: "#" },
      { label: "Appearances", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Uses", href: "#" },
    ],
  },
  {
    label: "Social",
    href: "#",
    links: [
      { label: "Email", href: "#" },
      { label: "Email", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Linkedin", href: "#" },
      { label: "Email", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Github", href: "#" },
      { label: "Linkedin", href: "#" },
      { label: "RSS", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <Box 
    // background={colors.secondary}
    >
      <Container maxW="80%" padding="5rem 0">
        <VStack spacing={5} alignItems="initial">
          <Flex
            flexWrap="wrap"
            direction={{ base: "column", md: "row" }}
            alignItems="start"
            justifyContent="space-between"
          >
            {footerData.map((data, index) => (
              <Flex key={index} direction="column" mb="4">
                <Link
                  fontWeight="500"
                  href={data.href}
                  fontSize="17px"
                  color={colors.primary}
                >
                  {data.label}
                </Link>
                <Flex direction={{ base: "row", md: "column" }}>
                  {data.links.map((link, index) => (
                    <Link
                      key={index}
                      padding={1}
                      fontSize={{ base: "sm", sm: "md" }}
                      href="#"
                      mr={{ base: 1, sm: 2, md: 0 }}
                     color="black"
                     opacity="0.7"
                      _hover={{ color:colors.primary}}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex alignItems="center">
            <Text color="gray.500" fontSize="0.875rem" pl="0.5rem">
              &copy; 2019 company, Inc. All rights reserved.
            </Text>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
