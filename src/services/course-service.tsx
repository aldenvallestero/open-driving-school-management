import AxiosClient from "../client/axios-client";

export default class CourseService extends AxiosClient {
  async createCourse({ name, description, price, user }: any) {
    try {
      const { data } = await this.courseClient.post(
        "/",
        { ...{ name, description, price } },
        { headers: { Authorization: "Bearer " + user } },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCourseById(courseId: string) {
    try {
      const result = await this.courseClient.get(`/${courseId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCoursesBySchoolId(token: string) {
    try {
      const { data } = await this.courseClient.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
