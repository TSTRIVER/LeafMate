import React from "react";
import Main from "./HomePage/Main.jsx";
import Page from "./Pages/Page.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/page" element={<Page />}></Route>
      </Routes>
    </>
  );
};

export default App;
