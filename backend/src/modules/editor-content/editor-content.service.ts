import { EditorContent } from "@prisma/client";
import { SaveEditorContentDto } from "./dto/save-editor-content.dto";
import { EditorContentRepository } from "./editor-content.repository";
import HttpException from "../../core/validations/http-exception";

export class EditorContentService {
  private readonly editorContentRepository: EditorContentRepository =
    new EditorContentRepository();

  /**
   * Get editor content
   * @param id
   * @returns
   */
  async getEditorContent(
    id: number
  ): Promise<{ error?: HttpException; data?: EditorContent }> {
    const editorContent =
      await this.editorContentRepository.getEditorContentById(id);
    if (!editorContent) {
      return { error: new HttpException(404, "Editor content not found") };
    }
    return { data: editorContent };
  }

  /**
   * Save editor content
   * @param saveEditorContentDto
   * @returns
   */
  async saveEditorContent(
    saveEditorContentDto: SaveEditorContentDto
  ): Promise<{ error?: HttpException; data?: EditorContent }> {
    const savedEditorContent =
      await this.editorContentRepository.saveEditorContent(
        saveEditorContentDto
      );
    if (!savedEditorContent) {
      return {
        error: new HttpException(
          500,
          "Something went wrong while saving the content"
        ),
      };
    }

    return { data: savedEditorContent };
  }
}
