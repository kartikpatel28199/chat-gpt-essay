import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./components/Menubar";
import { useEffect, useState } from "react";
import api from "../../common/api";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { LoadingButton } from "@mui/lab";
import AlertBox from "../../common/components/alertbox/alertbox";

const ydoc = new Y.Doc();

const provider = new HocuspocusProvider({
  url: "ws://localhost:4001",
  name: "example-document",
  document: ydoc,
});

const Tiptap = () => {
  const [editorContent, setEditorContent] = useState("");
  const [editorContentId, setEditorContentId] = useState<number>();
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleAskQuestion = async (question: string) => {
    const data = { question };
    const response = await api.openAI.askQuestion(data);
    setSubmitButtonLoading(false);
    editor?.setEditable(true);
    if (response.data.error) {
      setErrorMessage(response.data.error.message);
      setShowAlertBox(true);
      setTimeout(() => {
        setShowAlertBox(false);
        setErrorMessage("");
      }, 3000);
    } else {
      const temp = `\n${response.data.data}`;
      editor?.commands.insertContent(temp);
    }
  };

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
      }),
    ],
    onFocus: () => {},
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    onBlur: () => {
      saveEditorContent();
    },
  });

  useEffect(() => {
    if (localStorage.getItem("editorContentId")) {
      const editorId = localStorage.getItem(
        "editorContentId"
      ) as unknown as number;
      (async () => {
        await getEditor(editorId);
      })();
    }
  }, [editorContentId]);

  async function getEditor(editorId: number) {
    const response = await api.editorContent.getEditorContent(
      editorId as number
    );

    if (!response.data.error) {
      setEditorContent(editorContent + response.data.content);
      setEditorContentId(response.data.id);
      editor?.commands.setContent(editorContent);
    }
  }

  if (localStorage.getItem("editorContentId") && !editorContentId) {
    return <>Still loading...</>;
  }

  return (
    <div>
      <div className="text-editor">
        <MenuBar editor={editor} />
        <EditorContent
          className="editor-content"
          editor={editor}
          autoFocus={false}
          capture={false}
        />
      </div>
      <LoadingButton
        variant="contained"
        size="large"
        color="inherit"
        loading={isSubmitButtonLoading}
        onClick={() => {
          setSubmitButtonLoading(true);
          editor?.setEditable(false);
          handleAskQuestion(editor?.getText() as string);
        }}
      >
        Ask Chat GPT
      </LoadingButton>

      <div>{showAlertBox && <AlertBox message={errorMessage} />}</div>
    </div>
  );
};

export default Tiptap;
