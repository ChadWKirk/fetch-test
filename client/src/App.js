import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Edit from "./components/edit";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/update/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
