import axios, { Axios } from "axios";

abstract class AxiosClient {
  baseURL: string;
  noteClient: Axios;
  schoolClient: Axios;
  branchClient: Axios;
  courseClient: Axios;
  vehicleClient: Axios;
  studentClient: Axios;
  enrolleeClient: Axios;
  attendanceClient: Axios;

  constructor() {
    this.baseURL = "http://localhost:8080";
    this.schoolClient = axios.create({
      baseURL: this.baseURL + "/school",
    });

    this.branchClient = axios.create({
      baseURL: this.baseURL + "/branch",
    });

    this.courseClient = axios.create({
      baseURL: this.baseURL + "/course",
    });

    this.studentClient = axios.create({
      baseURL: this.baseURL + "/student",
    });

    this.enrolleeClient = axios.create({
      baseURL: this.baseURL + "/enrollee",
    });

    this.attendanceClient = axios.create({
      baseURL: this.baseURL + "/attendance",
    });

    this.noteClient = axios.create({
      baseURL: this.baseURL + "/note",
    });

    this.vehicleClient = axios.create({
      baseURL: this.baseURL + "/vehicle",
    });
  }
}

export default AxiosClient;
