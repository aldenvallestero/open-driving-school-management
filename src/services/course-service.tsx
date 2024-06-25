import AxiosClient from "../client/axios-client";

export default class CourseService extends AxiosClient {
  async createCourse({ name, description, price, schoolToken }: any) {
    try {
      const { data } = await this.courseClient.post(
        "/",
        { ...{ name, description, price } },
        { headers: { Authorization: "Bearer " + schoolToken } },
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

  async getAllCoursesBySchoolId(schoolToken: string) {
    try {
      const { data } = await this.courseClient.get("/", {
        headers: { Authorization: `Bearer ${schoolToken}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
