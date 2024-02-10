import React, { useEffect, useState } from "react";
import animationData from "../../assets/animation/Animation - 1706901325796.json";
import Lottie from "react-lottie";
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { Section } from "@react-email/components";
import { colors } from "../../components/Constants";
import styles from "../../assets/styles/department.module.scss";
import { useQuery } from "react-query";
import { httpClient } from "../../utils/httpClient";
import { Search2Icon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Department() {
  //first like an id , second accept a func that returns a promise
  const { isLoading, data, error } = useQuery("department", () => {
    return httpClient.get("/department");
  });
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
   
    urlParams.set("_page", page.toString());
    navigate(`?${urlParams.toString()}`);
  }, [ location.search, navigate, page]);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner size="xl" /> <h1>Loading</h1>
      </div>
    );
  }
 
  const filteredData = data?.data?.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = filteredData
  ? Math.ceil(filteredData.length / perPage)
  : 0;
const startIndex = filteredData ? (page - 1) * perPage : 0;

const endIndex =
  page === totalPages
    ? filteredData
      ? filteredData.length
      : 0
    : startIndex + perPage;
  
   

  return (
    <main>
      <Section className={styles.dep_list}>
        <Container maxW="72%">
          <Box>
            <Text
              mb="12px"
              padding="4rem 0  20px"
              textAlign="center"
              color={colors.secondary}
              fontSize="38px"
              fontWeight="bold"
              position="relative"
              _after={{
                right: "47.4%",
                content: `" "`,
                top: "100%",
                position: "absolute",
                width: "4%",
                borderTop: "4px solid #e12454",
              }}
            >
              Patient care
            </Text>
            <Text
              textAlign="center"
              color={colors.paragraph}
              margin="20px auto "
              w="60%"
            >
              Lets know moreel necessitatibus dolor asperiores illum possimus
              sint voluptates incidunt molestias nostrum laudantium. Maiores
              porro cumque quaerat.
            </Text>
          </Box>
          {data?.data.length > 0 && (
            <InputGroup w="50%" margin="0 auto">
              <InputLeftElement pointerEvents="none">
                <Search2Icon marginLeft={3} color="gray.600" />
              </InputLeftElement>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="20px"
                type="text"
                placeholder="Search ... "
              />
            </InputGroup>
          )}
          <Box
            color={colors.primary}
            fontWeight="700"
            fontSize="28px"
            textAlign="center"
            margin="0 auto"
          >
            {data == null && error != null && (
              <Text as="h1">Failed to get Departments</Text>
            )}

            {data?.data.length == 0 && <Text as="h1">No items ...</Text>}
            {data == null && error == null && isLoading}

            {filteredData?.length === 0 && data?.data.length != 0 && (
              <Text as="h1">There are no items like "{searchTerm}"</Text>
            )}
          </Box>
          <SimpleGrid gap="20px" alignItems="center" columns={3}>
            {filteredData?.slice(startIndex, endIndex).map((department, i) => (
              <Flex
                w="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                key={department.id}
              >
                <Lottie width="14%" options={defaultOptions} />
                <Text
                  fontSize="20px"
                  color={colors.secondary}
                  fontWeight="bold"
                >
                  {department.name}
                </Text>
                <Text w="80%" textAlign="center" color={colors.paragraph}>
                  {department.departmentDescription}
                </Text>
                <Text
                  _hover={{
                    color: colors.primary,
                  }}
                  fontSize="14px"
                  fontWeight="600"
                  color={colors.secondary}
                >
                  <Link to="/">Read More</Link>
                </Text>
              </Flex>
            ))}
          </SimpleGrid>

          <Box margin="3rem 0" textAlign="center"><Pagination
                  filteredData={filteredData}
                  perPage={perPage}
                  page={page}
                  setPage={setPage}
                />
             </Box>
        </Container>
      </Section>
    </main>
  );
}
