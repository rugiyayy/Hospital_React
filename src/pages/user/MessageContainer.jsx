import React from "react";

const MessageContainer = ({ messages }) => {
  return (
    <div  style={{border:"1px solid red", height:"50vh"}}>
      {messages.map((msg, index) => (
        <table style={{border:"1px solid green", height:"50vh"}}>
          <tr key={index}>
            <td>
              {msg.msg}-{msg.username}
            </td>
          </tr>
        </table>
      ))}
    </div>
  );
};

export default MessageContainer;
