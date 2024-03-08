import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ButtonGroup,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { colors } from "../../components/Constants";
import { Spinner1 } from "../../components/AppointmentRepetedParts";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, EmailIcon, Search2Icon } from "@chakra-ui/icons";
import Pagination2 from "../../components/Pagination2";
import SentEmailDetailModal from "../../components/SentEmailDetailModal";

export default function SendedEmailsList() {
  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userName, role } = useSelector((state) => state.account);
  const queryClient = useQueryClient();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [loggedIn, setLoggedIn] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!userName) {
      setLoggedIn(false);
    }
  }, [userName, toast]);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (role !== "Doctor") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [role, navigate, toast]);

  const getSentEmails = async () => {
    const params = {
      page,
      to: searchQuery,
      perPage,
    };
    const response = await httpClient.get(`/email/${userName}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  const {
    isLoading,
    data: email,
    error: emailError,
  } = useQuery(["sentEmails", page, perPage, searchQuery], getSentEmails, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  const deleteEmail = useMutation(
    (id) =>
      httpClient.delete(`/email/soft/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: () => {
        toast({
          title: "Email is deleted",
          description: "Email has been successfully deleted.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: (error) => {
        console.error("Error deleting docto account", error);
        toast({
          title: "Error",
          description:
            error.response?.data ||
            error.message ||
            "Something went wrong. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );
  useEffect(() => {
    if (!isLoading && deleteEmail.isSuccess) {
      queryClient.invalidateQueries("sentEmails");
    }
  }, [isLoading, deleteEmail.isSuccess, queryClient]);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("perPage", perPage.toString());

    navigate(`?${urlParams.toString()}`);
  }, [page, perPage, navigate]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setPage(1);

  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (!loggedIn) {
    return null;
  }
  //   if (appointmentLoading) {
  //     return <Spinner1 />;
  //   }
  console.log(email?.sentEmails);

  return (
    <Container mt="1rem" mb="6rem" maxW="72%">
      <Box>
        <Text
          mb="40px"
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
          Sent emails
        </Text>
      </Box>

      {emailError ? (
        <Text
          margin="4rem 0"
          padding="5rem"
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          as="h2"
        >
          Something went wrong, please try again later
        </Text>
      ) : isLoading ? (
        <Spinner1 />
      ) : email?.totalCount === 0 && searchQuery === ""? (
        <Text
          margin="4rem 0"
          padding="5rem"
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          as="h2"
        >
          No Sent Emails
        </Text>
      ) : (
        <Box>
          <InputGroup w="50%" margin="3rem auto">
            <InputLeftElement pointerEvents="none">
              <Search2Icon marginLeft={3} color="gray.600" />
            </InputLeftElement>
            <Input
              autoFocus
              borderRadius="20px"
              type="search"
              placeholder="Search by Email address"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
          {searchQuery !== "" && email?.totalCount === 0  && (
            <Text
              margin="4rem 0"
              padding="5rem"
              color={colors.primary}
              fontWeight="700"
              fontSize="32px"
              textAlign="center"
              as="h2"
            >
              No matching emails found
            </Text>
          )}

          <Box height="60vh" margin="3rem 0">
            {email?.totalCount > 0 && (
              <Table w="100%" variant="simple" margin="50px auto ">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th textAlign="center">To</Th>
                    <Th textAlign="center">Sent Date</Th>
                    <Th textAlign="center">For more details</Th>
                    <Th textAlign="end"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {email?.sentEmails?.map((email, i) => (
                    <Tr key={email?.id}>
                      <Td w="5%">{i + 1 + page * perPage - perPage}</Td>
                      <Td w="30%">
                        <Box
                          textAlign="center"
                          width="100%"
                          margin="0 auto"
                          as="a"
                          href={`/sendEmail?to=${email?.to}`}
                        >
                          <Flex
                            flexDirection="column"
                            alignItems="center"
                            gap="12px"
                          >
                            <Text as="p"> {email?.to}</Text>
                            <EmailIcon color="blue.500" cursor="pointer" />
                          </Flex>
                        </Box>
                      </Td>

                      <Td w="25%" textAlign="center">
                        {email?.sentTime}
                      </Td>
                      <Td
                        w="25%"
                        textAlign="center"
                        onClick={() => setSelectedEmail(email)}
                      >
                        <Button>Get more</Button>
                      </Td>
                      <Td w="15%" textAlign="end">
                        <Button
                          onClick={() => deleteEmail.mutate(email?.id)}
                          marginLeft="12px"
                          color="red"
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                  <SentEmailDetailModal
                    isOpen={!!selectedEmail}
                    onClose={() => setSelectedEmail(null)}
                    email={selectedEmail}
                  />
                </Tbody>
              </Table>
            )}
          </Box>
          <Pagination2
            totalCount={email?.totalCount}
            perPage={perPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            page={page}
          />
        </Box>
      )}
    </Container>
  );
}
