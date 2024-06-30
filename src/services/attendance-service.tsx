/* eslint-disable @typescript-eslint/no-useless-constructor */
import AxiosClient from "../client/axios-client";

export class AttendanceService extends AxiosClient {
  constructor() {
    super();
  }

  async createAttendance(token: string, newAttendance: any): Promise<any> {
    try {
      const { data } = await this.attendanceClient.post(
        "/",
        { ...newAttendance },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAttendancesBySchoolId(token: string): Promise<any> {
    try {
      const { data } = await this.attendanceClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getStudentById(id: string): Promise<any> {
    // const { data } = await this.axios.get('/students', { params: { name } })
    // return data
    return {
      name: "Vallestero, Alden, Juanillo",
      address: "Luwasan, Catmon, Santa Maria, 3022, Bulacan",
      phone: "09455915567",
      gender: "male",
      birthday: "0391203921",
      enrollment: "Jan 1, 202222",
      history: {},
    };
  }

  async getStudentByName(name: string): Promise<void> {
    // const { data } = await this.axios.get('/students', { params: { name } })
    // return data
  }
}
