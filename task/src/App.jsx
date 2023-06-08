import { Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import IndexPage from "./Page/IndexPage";
import Detail from "./Page/Detail";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<IndexPage />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}

export default App;
