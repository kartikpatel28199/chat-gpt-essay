import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./components/Menubar";
import { useEffect, useState } from "react";
import api from "../../common/api";

const Tiptap = () => {
  const [editorContent, setEditorContent] = useState("");
  const [editorContentId, setEditorContentId] = useState<number>();

  useEffect(() => {
    if (localStorage.getItem("editorContentId")) {
      const editorId = localStorage.getItem(
        "editorContentId"
      ) as unknown as number;
      getEditor(editorId);
    }
  }, [editorContentId]);

  async function getEditor(editorId: number) {
    const response = await api.editorContent.getEditorContent(
      editorId as number
    );
    if (!response.data.error) {
      setEditorContent(response.data.content);
      setEditorContentId(response.data.id);
      editor?.commands.setContent(editorContent);
    }
  }

  const saveEditorContent = async () => {
    const data = { content: editorContent, id: editorContentId };
    const response = await api.editorContent.saveEditorContent(data);
    if (!response.data.error) {
      const editorContentId = response.data.id;
      setEditorContentId(response.data.id);
      if (!localStorage.getItem("editorContentId")) {
        localStorage.setItem("editorContentId", editorContentId);
      }
    }
  };

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit,
    ],
    onFocus: () => {},
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    onBlur: () => {
      saveEditorContent();
    },
  });

  if (localStorage.getItem("editorContentId") && !editorContentId) {
    return <>Still loading...</>;
  }

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
