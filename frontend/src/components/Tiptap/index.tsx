import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./components/Menubar";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit,
    ],
    onFocus: () => {},
  });

  return (
    <div className="text-editor">
      <MenuBar editor={editor} />
      <div className="editor-content">
        <EditorContent
          editor={editor}
          className="ProseMirror"
          autoFocus={false}
          capture={false}
        />
      </div>
    </div>
  );
};

export default Tiptap;
