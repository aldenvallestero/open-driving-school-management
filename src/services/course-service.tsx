import AxiosClient from "../client/axios-client";

export class CourseService extends AxiosClient {
  async createCourse(schoolToken: string, newCourse: any) {
    try {
      console.log("schoolToken", schoolToken);
      const { data } = await this.courseClient.post(
        "/",
        { ...newCourse },
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
