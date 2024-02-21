import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import MessageContainer from "./MessageContainer";
import SendMessage from "./SendMessage";

const ChatRoom = ({ messages, sendMessage }) => (
  <Container>
    <Heading>chat room</Heading>

    <MessageContainer messages={messages} />
    <SendMessage sendMessage={sendMessage} />

  </Container>
);

export default ChatRoom;
