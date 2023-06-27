import React from "react";
import "./App.css";
import Interaction from "./components/Interaction";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tiptap from "./components/Tiptap";

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
