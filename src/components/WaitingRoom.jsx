import { Box, Button, Container, FormControl, Input } from "@chakra-ui/react";
import { Form } from "formik";
import React, { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState();
  const [chatRoom, setChatRoom] = useState();

  return (
    <Container w="72%">
      <Box margin="5rem 0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinChatRoom(username, chatRoom);
          }}
        >
          <FormControl>
            <Input
              w="50%"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              w="50%"
              placeholder="ChatRoom"
              value={chatRoom}
              onChange={(e) => setChatRoom(e.target.value)}
            />
          </FormControl>

          <Button type="submit">Join</Button>
        </form>
      </Box>
    </Container>
  );
};

export default WaitingRoom;
