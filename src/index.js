import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { transactionReducer } from "./reducers/transactionReducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
if (localStorage.getItem("transactions") == null)
  localStorage.setItem("transactions", JSON.stringify([]));
let initialState = {
  currentIndex: -1,
  list: JSON.parse(localStorage.getItem("transactions")),
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  transactionReducer,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__({
  //     serialize: true,
  //   }),
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
