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
import { CalendarIcon, EmailIcon } from "@chakra-ui/icons";

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
  } = useQuery(["sentEmails", page, perPage], getSentEmails, {
    refetchOnWindowFocus: false,
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

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalEmail = email?.data?.length ?? 0;
  const totalPages = Math.ceil(totalEmail / perPage);
  const handleNextPage = () => {
    if (page > totalPages) {
      setPage(page + 1);
    }
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

      {emailError && (
        <Text
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          padding="3rem 0 "
          as="h2"
        >
          Something went wrong , please try again later
        </Text>
      )}
      {email?.totalCount > 0 && (
        <Table w="100%" variant="simple" margin="50px auto ">
          <Thead>
            <Tr>
              <Th></Th>
              <Th textAlign="center">To</Th>
              <Th textAlign="center">Subject</Th>
              <Th textAlign="center">Message</Th>
              <Th textAlign="center">Sent Time</Th>
              <Th textAlign="end"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {email?.sentEmails?.map((email, i) => (
              <Tr key={email?.id}>
                <Td w="5%">{i + 1 + page * perPage - perPage}</Td>
                <Td w="20%">
                  <Box
                    textAlign="center"
                    width="100%"
                    margin="0 auto"
                    as="a"
                    href={`/sendEmail?to=${email?.to}`}
                  >
                    <Flex flexDirection="column" alignItems="center" gap="12px">
                      <Text as="p"> {email?.to}</Text>
                      <EmailIcon color="blue.500" cursor="pointer" />
                    </Flex>
                  </Box>
                </Td>

                <Td w="20%" textAlign="center">
                  {email?.subject}
                </Td>
                <Td w="30%" textAlign="center">
                  {email?.body}
                </Td>

                <Td w="20%" textAlign="end">
                  {email?.sentTime}
                </Td>
                <Td w="5%" textAlign="end">
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
          </Tbody>
        </Table>
      )}
      <ButtonGroup w="100%" margin="2rem 0 5rem" justifyContent="center">
        <Button
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={handlePreviousPage}
          isDisabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={handleNextPage}
          isDisabled={
            email?.totalCount == perPage || email?.totalCount < perPage * page
          }
        >
          Next Page
        </Button>
      </ButtonGroup>
    </Container>
  );
}
