import { Button, FormControl, Heading, Input, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";

const SendMessage = ({ sendMessage }) => {
  const [msg, setMessage] = useState("");
  return (
    <form style={{border:"1px solid red", height:"50vh"}}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(msg);
        setMessage("");
      }}
      action=""
    >
      <InputGroup>
        <Heading>Chating</Heading>
        <FormControl
          onchange={(e) => setMessage(e.target.value)}
          value={msg} _placeholder="type.."
        >
            <Input/>
        </FormControl>
        <Button type="submit"  >Send</Button>
      </InputGroup>
    </form>
  );
};

export default SendMessage;
