import { FastifyReply } from "fastify";
import { EditorContentService } from "./editor-content.service";
import { Request } from "../../core/types/request.types";
import { SaveEditorContentDto } from "./dto/save-editor-content.dto";
import { validateDto } from "../../core/validations/dto-validation";

export class EditorContentController {
  private readonly editorContentService: EditorContentService;

  constructor() {
    this.editorContentService = new EditorContentService();
  }

  /**
   * Get editor content
   * @param req
   * @param reply
   */
  getEditorContent = async (req: Request, reply: FastifyReply) => {
    const editorContentId = req.params["id"] as number;

    const result = await this.editorContentService.getEditorContent(
      editorContentId
    );
    if (result.error) {
      reply.code(result.error.status).send({ error: result.error.message });
      return;
    }

    reply.code(200).send({
      message: "Editor content fetched successfully",
      data: result.data,
    });
  };

  /**
   * Save editor content
   * @param req
   * @param reply
   * @returns
   */
  saveEditorContent = async (req: Request, reply: FastifyReply) => {
    const saveEditorContentDto = new SaveEditorContentDto({
      ...(req.body as any),
    });

    const error = await validateDto(saveEditorContentDto);
    if (error) {
      reply.code(400).send({ error });
      return;
    }

    const result = await this.editorContentService.saveEditorContent(
      saveEditorContentDto
    );
    if (result.error) {
      reply.code(result.error.status).send({ error: result.error.message });
      return;
    }

    reply.code(201).send({
      message: "Editor content saved successfully",
      data: result.data,
    });
  };
}
