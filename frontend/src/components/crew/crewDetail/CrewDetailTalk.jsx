import React, { useState } from "react";
import {
  Avatar,
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import userIcon from "../../../assets/icons/userIcon.svg";

const CrewDetailTalk = ({}) => {
  const [messages, setMessages] = useState([]);
  const handleMessageSend = (text) => {
    setMessages((prev) => [...prev, text]);
  };
  return (
    <ChatContainer
      style={{
        height: "36vh",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
        paddingTop: "10px",
        borderRadius: "10px",
      }}
    >
      <MessageList>
        <Message
          model={{
            message: "hihi",
            sentTime: "15 mins ago",
            sener: "dwdw",
            direction: "incoming",
            position: "single",
          }}
        >
          <Avatar src="https://picsum.photos/200/300?random=45" name="Joe" />
          <Message.Footer sender="Emily" sentTime="just now" />
        </Message>
        {messages.map((mes, index) => {
          return (
            <Message
              key={index}
              model={{
                message: mes,
                sentTime: "15 mins ago",
                sener: "localSender",
                direction: "outgoing",
                position: "single",
              }}
            />
          );
        })}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        attachButton={false}
        onSend={(innerHtml, textContent, innerText, nodes) => {
          handleMessageSend(textContent);
        }}
        style={{
          background: "#fff",
        }}
      />
    </ChatContainer>
  );
};
export default React.memo(CrewDetailTalk);
