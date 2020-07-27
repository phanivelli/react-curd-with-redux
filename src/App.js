import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TransactionList from "./components/TransactionList";
import { createStore } from "redux";
import { transactionReducer } from "./reducers/transactionReducers";

function App() {
  return <TransactionList />;
}

export default App;
