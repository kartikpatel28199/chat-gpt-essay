import { FastifyInstance } from "fastify";
import { EditorContentController } from "../editor-content/editor-content.controller";

const editorContentController = new EditorContentController();

export default async function editorContentRouter(fastify: FastifyInstance) {
  fastify.get(
    "/:id",
    {
      schema: {
        summary: "Get editor content",
        tags: ["Editor Content"],
        params: {
          id: { type: "number" },
        },
      },
    },
    editorContentController.getEditorContent
  );

  fastify.put(
    "/save",
    {
      schema: {
        summary: "Save editor content",
        tags: ["Editor Content"],
        body: {
          type: "object",
          properties: {
            content: { type: "string" },
            id: { type: "number" },
          },
        },
      },
    },
    editorContentController.saveEditorContent
  );
}
