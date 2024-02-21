import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { colors } from "../../components/Constants";
import WaitingRoom from "../../components/WaitingRoom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./ChatRoom";

const DocChatP = () => {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      //inittiate a connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7041/chat")
        .configureLogging(LogLevel.Information)
        .build();
      //set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg:", msg);
      });

      conn.on("RecieveSpecificMessage", (username, msg) => {
        setMessages((prevMessages) => [...prevMessages, { username, msg }]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);
    } catch (e) {
      console.log( e);
    }
  };

  const sendMessage= async (message)=>{
    try {
        await conn.invoke("SendMessage",message)
    } catch (e) {
        console.log(e);
    }
  }
  return (
    <main>
      <Container mt="3rem" mb="60rem" maxW="60%">
        {/* <Flex boxShadow="base" rounded="md" bg="white">
          <Box w="25%" boxShadow="base" rounded="md" bg="white">
            <Text
             
              textAlign="center"
              padding="12px 0"
            >
              Patients
            </Text>
            <Divider/>
            <Divider />
            <List height="40vh" overflowY="scroll" overflowX="hidden" w="100%">
              <ListItem
                cursor="pointer"
                //   padding="20px 12px"
                boxShadow="xs"
                p="3"
                rounded="md"
                bg="white"
                gap="8px"
                display="flex"
                alignItems="center"
                h="60px"
              >
                <FontAwesomeIcon fontSize="32px" icon={faCircleUser} />{" "}
                <Text as="span">patinet username (email)</Text>
              </ListItem>
            </List>
          </Box>
          <Box w="75%">
            <Text
              fontWeight="600"
              borderBottom="2px solid #F0F8FF"
              textAlign="center"
              padding="12px 0"
            >
              Chating Room
            </Text>
            <Box height="40vh">

            </Box>
          </Box>
        </Flex> */}

        <Heading>Hello world</Heading>
        {!conn ? (
          <WaitingRoom joinChatRoom={joinChatRoom} />
        ) : (
          <ChatRoom messages={messages} sendMessage={sendMessage}/>
        )}
      </Container>
    </main>
  );
};

export default DocChatP;
