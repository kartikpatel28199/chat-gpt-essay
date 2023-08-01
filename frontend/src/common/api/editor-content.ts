import axios from "axios";
import { API_URL } from "../constant";

/**
 * Get editor content
 * @param id
 * @returns
 */
const getEditorContent = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/editor-content/${id}`);
    return response.data;
  } catch (error) {
    return { data: { error: error } };
  }
};

/**
 * Save editor content
 * @param data
 * @returns
 */
const saveEditorContent = async (data: any) => {
  try {
    const response = await axios.put(`${API_URL}/editor-content/save`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    return { data: { error: error } };
  }
};

const editorContentAPI = {
  getEditorContent,
  saveEditorContent,
};
export default editorContentAPI;
