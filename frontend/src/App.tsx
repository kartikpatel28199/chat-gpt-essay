import React from "react";
import "./App.css";
import Interaction from "./Interaction/Interaction";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tiptap from "./Tiptap/Tiptap";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Interaction />} />
          <Route path="tiptap" element={<Tiptap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
