import "./App.css";
import React, {useEffect, useState} from "react";
import {Router} from "./Router";
import {Grommet, Notification} from "grommet";
import {GrommetTheme} from "./utils/util";
import {API_SERVER} from "./apis/api";
import {useSelector} from "react-redux";
import {EventSourcePolyfill} from 'event-source-polyfill';

function App() {
  const [visible, setVisible] = useState(false);
  const User = useSelector((state) => state.user.user);
  let eventSource = null;
  useEffect(() => {
    if (User !== undefined && eventSource == null) {
      eventSource = new EventSourcePolyfill(`${API_SERVER}member-service/notification/subscribe`, {
        headers: {
          'memberId': localStorage.getItem("memberId"),
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,

        },
        withCredentials: true,

      });

    }
    console.log("========================================================")

    console.log(User);
    console.log(eventSource);
    if (eventSource != null) {
      eventSource.addEventListener("sse", (event) => {
        // console.log(event.data + " " + event.lastEventId);

        // const data = JSON.parse(event.data);

      }, true);
      // eventSource.onopen = event => {
      //   console.log("connection opened" + event.data);
      // };

      eventSource.addEventListener("message", (event) => {
        console.log(event.data);
      },false)

      return () => {
        eventSource.close();
        console.log("eventsource closed");
      };
    }
  }, [User])


  return (
    <div className="App">
      {visible && (
        <Grommet theme={GrommetTheme}>
          <Notification
            toast={{position: "center"}}
            title={"새 마커가 등록되었습니다."}
            status={"normal"}
            onClose={() => setVisible(false)}
          />
        </Grommet>
      )}
      <Router/>
    </div>
  );
}

export default App;
