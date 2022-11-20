import React, { useEffect, useState } from "react";
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
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import userIcon from "../../../assets/icons/userIcon.svg";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
// import ChatSound from "../../assets/sounds/chatNoti.mp3";
import { useSelector } from "react-redux";
import { dateToDetailString, httpToHttps } from "../../../utils/util";
import { getCrewChats } from "../../../apis/crewApi";

var client = null;

const CrewDetailTalk = ({ crewId }) => {
  const [messages, setMessages] = useState([]);
  // const handleMessageSend = (text) => {
  //   setMessages((prev) => [...prev, text]);
  // };
  const User = useSelector((state) => state.user.user);
  console.log(User);
  const handleMessageSend = (text) => {
    publishChatting(text);
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     text: text,
    //     sentTime: new Date(),
    //     sender: User.nickname,
    //     direction: "outgoing",
    //     position: "single",
    //     type: "message",
    //   },
    // ]);
  };
  // ENTER, QUIT, TALK, PING, POS

  const handleMessageSort = (data) => {
    // 1. 채팅일 때
    if (data.type === "TALK") {
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          sentTime: data.sendTime,
          sender: data.sender.nickname,
          direction:
            User.nickname === data.sender.nickname ? "outgoing" : "incoming",
          position: "single",
          type: "message",
          profileImg: data.sender.profileImageUrl,
        },
      ]);
    }
    // 4. 사용자 입장했을때/퇴장했을 떄
    else if (data.type === "ENTER" || data.type === "QUIT") {
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          sentTime: data.time,
          sender: data.sender.nickname,
          direction: "incoming",
          position: "single",
          type: data.type,
        },
      ]);
    }
  };

  //웹소켓 채팅 발행
  const publishChatting = (text) => {
    if (client != null) {
      client.publish({
        destination: "/pub/crew/chat/message",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        },
        body: JSON.stringify({
          type: "TALK",
          roomId: crewId,
          message: text,
        }),
      });
    }
  };

  //웹소켓 초기화
  const initSocketClient = () => {
    client = new StompJs.Client({
      // brokerURL: "ws://k7a1061.p.ssafy.io:8081/ws-stomp",
      brokerURL: "wss://k7a1061.p.ssafy.io/member-service/ws-stomp",
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        memberId: localStorage.getItem("memberId"),
      },
      webSocketFactory: () => {
        return SockJS("https://k7a1061.p.ssafy.io/member-service/ws-stomp");
      },
      debug: (str) => {
        console.log("stomp debug!!!", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onStompError: (frame) => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
        // client.deactivate();
      },
    });

    // 웹소켓 초기 연결
    client.onConnect = (frame) => {
      console.log("client init !!! ", frame);
      if (client != null)
        client.publish({
          destination: "/pub/crew/chat/message",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            memberId: localStorage.getItem("memberId"),
          },
          // body: JSON.stringify({
          //   type: "ENTER",
          //   roomId:roomId,
          // }),
        });
      subscribe();
    };

    client.activate();
  };

  // 웹소켓 구독
  const subscribe = () => {
    if (client != null) {
      console.log("subs!!!!!!!!!");
      client.subscribe(
        "/sub/chat/crew/" + crewId,
        (response) => {
          console.log(response);
          const data = JSON.parse(response.body);
          // 1. 채팅일 때
          handleMessageSort(data);
          // if (data.type === "TALK") {
          //   console.log("sender : ", data.sender);
          //   setMessages((prev) => [
          //     ...prev,
          //     {
          //       text: data.message,
          //       sentTime: data.sendTime,
          //       sender: data.sender.nickname,
          //       direction:
          //         User.nickname === data.sender.nickname
          //           ? "outgoing"
          //           : "incoming",
          //       position: "single",
          //       type: "message",
          //       profileImg: data.sender.profileImageUrl,
          //     },
          //   ]);
          // }
          // // 4. 사용자 입장했을때/퇴장했을 떄
          // else if (data.type === "ENTER" || data.type === "QUIT") {
          //   setMessages((prev) => [
          //     ...prev,
          //     {
          //       text: data.message,
          //       sentTime: data.time,
          //       sender: data.sender.nickname,
          //       direction: "incoming",
          //       position: "single",
          //       type: data.type,
          //     },
          //   ]);
          // }
          // rideMembers.members[data.memberId] = data;
          // setRideMembers({ ...rideMembers });
        },
        {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          memberId: localStorage.getItem("memberId"),
        }
      );
    }
  };
  // 웹소켓 연결해제
  const disConnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };

  // 웹소켓 초기화
  useEffect(() => {
    initSocketClient();
    getCrewChats(
      crewId,
      (response) => {
        console.log(response);
        response.data.forEach((message) => {
          handleMessageSort(message);
        });
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      if (client !== null) {
        disConnect();
      }
    };
  }, []);

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
        {/* <Message
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
        </Message> */}
        {messages.map((message, index) => {
          if (message.type === "message")
            return (
              <Message
                key={index}
                model={{
                  message: message.text,
                  sentTime: message.sentTime,
                  sender: message.sender,
                  direction: message.direction,
                  position: message.position,
                }}
              >
                <Avatar
                  src={httpToHttps(message.profileImg)}
                  name={message.sender}
                />
                <Message.Footer
                  sender={message.sender}
                  sentTime={dateToDetailString(message.sentTime)}
                />
              </Message>
            );
          else if (message.type === "ENTER" || message.type === "QUIT")
            return <MessageSeparator key={index} content={message.text} />;
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
