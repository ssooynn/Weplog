import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./stores/modules";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist"; // load
import { PersistGate } from "redux-persist/integration/react"; // load
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale("ko"); // 언어 등록

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store); // 정의
ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode >
  document.getElementById("root")
);
reportWebVitals();
