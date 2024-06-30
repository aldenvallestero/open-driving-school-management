import AxiosClient from "../client/axios-client";

export class EnrollmentService extends AxiosClient {
  async createEnrollment(schoolToken: any, course: any) {
    try {
      const data = schoolToken;
      const token: string = await this.enrolleeClient.post("/", { ...data });
      return token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async updateEnrollment(schoolToken: any, data: any) {
    try {
      const data = schoolToken;
      const token: string = await this.enrolleeClient.post("/", { ...data });
      return token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
