import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./text-editor.css";

export default function TextEditor(props: any) {
  return (
    <ReactQuill
      className="TextEditor"
      theme="snow"
      value={props.value}
      placeholder="Chat gpt response"
    />
  );
}
