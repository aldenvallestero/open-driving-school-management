import AxiosClient from "../client/axios-client";
import { TRegister } from "../commons/type-common";

export class StudentService extends AxiosClient {
  async login(email: string, password: string) {
    try {
      const { data } = await this.studentClient.post("/login", {
        ...{ email, password },
      });
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async register(student: TRegister) {
    try {
      const { data } = await this.studentClient.post("/register", {
        ...student,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getStudentById(studentId: string, token: string) {
    try {
      const { data } = await this.studentClient.get(`/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getStudent(token: string) {
    try {
      const { data } = await this.studentClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllStudentsBySchoolId(token: string) {
    try {
      const { data } = await this.studentClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async createStudent(token: string, student: object) {
    try {
      const { data } = await this.studentClient.post("/register", student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async searchStudent(token: string, filter: string) {
    try {
      const { data } = await this.studentClient.get("/search", {
        params: {
          filter,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async updateStudent(token: string, student: any) {
    try {
      const { data } = await this.studentClient.put(
        `/${student.studentId}`,
        {
          ...student,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
