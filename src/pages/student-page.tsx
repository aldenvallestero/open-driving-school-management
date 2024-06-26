import moment from "moment";
import { UserContext } from "../contexts/Context";
import Input from "../components/input-component";
import Button from "../components/button-component";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentService, EnrollmentService } from "../services";

export default function StudentPage() {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const { studentId } = useParams();
  const studentService = new StudentService();
  const enrollmentService = new EnrollmentService();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("Gender");
  const [birthday, setBirthday] = useState<string>("");
  const [ltoClientId, setLtoClientId] = useState<string>("XX-XXXXXX-XXXXXXX");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [status, setStatus] = useState<string>("PDC - Passed");

  const [, setCourses] = useState<any>();
  const [enrollment, setEnrollment] = useState<any>();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markCourseAsPaid = (enrollmentId: string) => {
    if (window.confirm("Are you sure this student has paid their balance?")) {
      enrollmentService.updateEnrollment(enrollmentId, { paymentStatus: "PAID" });
    }
  };

  const updateStudent = () => {
    const studentData = {
      studentId,
      name,
      email,
      address,
      phone,
      gender,
      birthday,
      ltoClientId,
      status,
    };
    studentService.updateStudent(user, studentData);

    alert("Update done!");
  };

  return (
    <div className="container-fluid bg-slate-200 p-6">
      <h1 className="font-bold text-3xl">{name}</h1>
      <span className="bg-green-600 text-white font-bold px-2 py-1 rounded-sm">{status}</span>

      <div className="block p-4 my-6">
        <h1 className="text-2xl font-bold mb-2">Personal Information</h1>
        <div className="mb-2">
          <label htmlFor="">Address</label>
          <Input type="text" callback={setAddress} defaultValue={address} />
        </div>

        <div className="mb-2">
          <label htmlFor="">Email</label>
          <Input type="text" callback={setEmail} defaultValue={email} />
        </div>

        <div className="mb-2">
          <label htmlFor="">Phone</label>
          <Input type="text" callback={setPhone} defaultValue={phone} />
        </div>
        <div className="mb-2">
          <label htmlFor="">Gender</label>
          <Input type="text" callback={setGender} defaultValue={gender} />
        </div>

        <div className="mb-2">
          <label htmlFor="">Birthday</label>
          <Input type="text" callback={setBirthday} defaultValue={birthday} />
        </div>
        <div className="mb-2">
          <label htmlFor="">LTO Client ID</label>
          <Input type="text" callback={setLtoClientId} defaultValue={ltoClientId} />
        </div>
        <span className="flex">
          Registration Date: {createdAt && moment(createdAt).format("MMMM DD, YYYY")}
        </span>
        <Button placeholder="Update Student Information" callback={updateStudent} />
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
                ({ student, course, branch, createdAt, exam, ...enrollment }: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <a href={`/attendance`}>{course?.name}</a>
                    </th>
                    <td className="px-6 py-4">{/* {JSON.stringify(course)} */}</td>
                    <td className="px-6 py-4">Passed</td>
                    <td className="px-6 py-4">{course?.enrollment?.status}</td>
                    <td className="px-6 py-4">{moment(createdAt).format("MMMM DD, YYYY")}</td>
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

      {/* Payment */}
      <div className="block shadow-md border-s-8 border-blue-800 rounded-md p-4 mb-4">
        <h1 className="font-bold text-2xl block mb-2">Payments History</h1>
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
                ({ student, course, branch, createdAt, exam, ...enrollment }: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <a href={`/attendance`}>{course?.name}</a>
                    </th>
                    <td className="px-6 py-4">{/* {JSON.stringify(course)} */}</td>
                    <td className="px-6 py-4">Passed</td>
                    <td className="px-6 py-4">{course?.enrollment?.status}</td>
                    <td className="px-6 py-4">{moment(createdAt).format("MMMM DD, YYYY")}</td>
                    <td className="px-6 py-4">
                      <Button
                        placeholder="Mark as paid"
                        callback={() => {
                          markCourseAsPaid(enrollment?._id);
                        }}
                      />
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
