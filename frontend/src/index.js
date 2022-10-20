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
