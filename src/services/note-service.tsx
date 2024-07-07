import AxiosClient from "../client/axios-client";

export class NoteService extends AxiosClient {
  async createNote(token: string, note: any) {
    try {
      const { data } = await this.noteClient.post("/", note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getNoteById(token: string, noteId: string) {
    try {
      const { data } = await this.noteClient.get(`/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllNotesBySchoolId(token: string) {
    try {
      const { data } = await this.noteClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateNote(token: string, noteId: string, address: string) {
    try {
      const { data } = await this.noteClient.put(
        `/${noteId}`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNote(token: string, note: string) {
    try {
      const { data } = await this.noteClient.delete(`/${note}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
