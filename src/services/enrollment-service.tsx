import AxiosClient from "../client/axios-client";

export default class EnrollmentService extends AxiosClient {
  async createEnrollment(user: any, course: any) {
    try {
      const data = user;
      const token: string = await this.enrolleeClient.post("/", { ...data });
      return token;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
