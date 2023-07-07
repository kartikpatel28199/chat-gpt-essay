import { EditorContent } from "@prisma/client";
import { prisma } from "../../prisma";
import { SaveEditorContentDto } from "./dto/save-editor-content.dto";

export class EditorContentRepository {
  /**
   * Get editor content
   * @param editorContentId
   * @returns
   */
  async getEditorContentById(id: number): Promise<EditorContent> {
    const editorContent = await prisma.editorContent.findFirst({
      where: { id },
    });
    return editorContent;
  }

  /**
   * Save editor content
   * @param saveEditorContentDto
   * @returns
   */
  async saveEditorContent(
    saveEditorContentDto: SaveEditorContentDto
  ): Promise<EditorContent> {
    const { id, content } = saveEditorContentDto;

    let savedContentDetail: EditorContent;
    if (id) {
      savedContentDetail = await prisma.editorContent.update({
        where: { id },
        data: { content },
      });
    } else {
      savedContentDetail = await prisma.editorContent.create({
        data: {
          content,
        },
      });
    }

    return savedContentDetail;
  }
}
