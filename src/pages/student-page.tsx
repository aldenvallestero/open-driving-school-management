import moment from "moment";
import { UserContext } from "../contexts/Context";
import { useContext, useEffect, useState } from "react";
import StudentService from "../services/student-service";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiTrash,
  HiPencil,
  HiClipboardList,
  HiUserCircle,
  HiStatusOffline,
} from "react-icons/hi";

export default function StudentPage() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const { studentId } = useParams();
  const studentService = new StudentService();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("Gender");
  const [birthday, setBirthday] = useState<string>("");
  const [ltoClientId, setLtoClientId] = useState<string>("XX-XXXXXX-XXXXXXX");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [status, setStatus] = useState<string>("PDC - Passed");

  const [courses, setCourses] = useState<any>();
  const [enrollment, setEnrollment] = useState<any>();

  const [selectedCourse, setSelectedCourse] = useState<any>();

  const [history] = useState([
    {
      description: "PDC Exam passed!",
      date: new Date().toDateString(),
      files: [{ name: "PDC Exam Paper" }, { name: "TDC Reviewer" }],
    },
    {
      description: "PDC Exam failed!",
      date: new Date().toDateString(),
    },
    {
      description: "TDC Exam passed!",
      date: new Date().toDateString(),
    },
    {
      description: "TDC Exam failed!",
      date: new Date().toDateString(),
    },
    {
      description: "Enrolled!",
      date: new Date().toDateString(),
    },
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/student/login");
      return;
    }

    if (studentId) {
      studentService.getStudentById(studentId, user).then((result: any) => {
        if (result) {
          setName(
            `${result.lastName}, ${result.firstName}, ${result.middleName}${result.marriageLastName ? `, ${result.marriageLastName}` : ""}`,
          );
          setEmail(result?.email);
          setAddress(result?.address);
          setPhone(result?.phone);
          setLtoClientId(result?.ltoClientId);
          setGender(result?.gender);
          setBirthday(result?.birthday);
          setStatus(result?.status);
          setCourses(result.courses);
          setEnrollment(result.enrollment);
          setCreatedAt(result?.createdAt);
        }
      });
    } else {
      studentService.getStudent(user).then((result: any) => {
        if (result) {
          setName(
            `${result.lastName}, ${result.firstName}, ${result.middleName}${result.marriageLastName ? `, ${result.marriageLastName}` : ""}`,
          );
          setAddress(result?.address);
          setPhone(result?.phone);
          setLtoClientId(result?.ltoClientId);
          setGender(result?.gender);
          setBirthday(result?.birthday);
          setStatus(result?.status);
          setCourses(result.courses);
          setEnrollment(result.enrollment);
          setCreatedAt(result.createdAt);
        }
      });
    }
  }, []);

  return (
    <div className="container-fluid bg-slate-200 p-6">
      <h1 className="font-bold text-3xl">{name}</h1>
      <span className="bg-green-600 text-white font-bold px-2 py-1 rounded-sm">
        {status}
      </span>

      <div className="block p-4 my-6">
        <h1 className="text-2xl font-bold mb-2">Personal Information</h1>
        <span className="flex">
          Address: {address}
          <HiPencil />
        </span>
        <span className="flex">
          Email: {email}
          <HiPencil />
        </span>
        <span className="flex">
          Phone: {phone}
          <HiPencil />
        </span>
        <span className="flex">
          Gender: {gender}
          <HiPencil />
        </span>
        <span className="flex">
          Birthday: {birthday}
          <HiPencil />
        </span>
        <span className="flex">
          LTO Client ID: {ltoClientId}
          <HiPencil />
        </span>
        <span className="flex">
          Registration Date:{" "}
          {createdAt && moment(createdAt).format("MMMM DD, YYYY")}
        </span>
      </div>

      <div className="block shadow-md border-s-8 border-blue-800 rounded-md p-4 mb-4">
        <h1 className="font-bold text-2xl block mb-2">Courses</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Hours spent
                </th>
                <th scope="col" className="px-6 py-3">
                  Exam
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Enrollment
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {enrollment?.map(
                ({
                  student,
                  course,
                  branch,
                  createdAt,
                  exam,
                  ...enrollment
                }: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <a href={`/attendance`}>{course?.name}</a>
                    </th>
                    <td className="px-6 py-4">
                      {/* {JSON.stringify(course)} */}
                    </td>
                    <td className="px-6 py-4">Passed</td>
                    <td className="px-6 py-4">{course?.enrollment?.status}</td>
                    <td className="px-6 py-4">
                      {moment(createdAt).format("MMMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex align-middle justify-center items-center bg-black text-white px-2 rounded-md mb-2 w-full">
                        View Attendance
                      </button>
                      <button className="flex align-middle justify-center items-center bg-black text-white px-2 rounded-md mb-2 w-full">
                        View Exam Result
                      </button>
                      <button className="flex align-middle justify-center items-center bg-black text-white px-2 rounded-md mb-2 w-full">
                        Upload Files
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
