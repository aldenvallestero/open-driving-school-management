import { Tabs } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { MdDashboard, MdDirectionsCar } from "react-icons/md";
import { Modal, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/alert-component";
import Input from "../components/input-component";
import { UserContext } from "../contexts/Context";
import Button from "../components/button-component";
import { useContext, useEffect, useState } from "react";
import InlineButton from "../components/inline-button-component";

import { HiTrash, HiPencil, HiUserCircle, HiClipboardList, HiNewspaper } from "react-icons/hi";

import {
  NoteService,
  SchoolService,
  BranchService,
  CourseService,
  VehicleService,
  StudentService,
  AttendanceService,
} from "../services";
import { OffPage } from "../components/off-page-component";

export default function SchoolPage() {
  const noteService = new NoteService();
  const schoolService = new SchoolService();
  const branchService = new BranchService();
  const courseService = new CourseService();
  const studentService = new StudentService();
  const vehicleService = new VehicleService();
  const attendanceService = new AttendanceService();

  const navigate = useNavigate();

  const [openCreateBranchModal, setOpenCreateBranchModal] = useState<boolean>(false);
  const [openUpdateBranchModal, setOpenUpdateBranchModal] = useState<boolean>(false);
  const [openCreateCourseModal, setOpenCreateCourseModal] = useState<boolean>(false);
  const [openUpdateCourseModal, setOpenUpdateCourseModal] = useState<boolean>(false);
  const [openCreateVehicleModal, setOpenCreateVehicleModal] = useState<boolean>(false);
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false);
  const [openAttendanceModal, setOpenAttendanceModal] = useState<boolean>(false);
  const [openCreateAttendanceModal, setOpenCreateAttendanceModal] = useState<boolean>(false);
  const [openBranchNotesModal, setOpenBranchNotesModal] = useState<boolean>(false);

  const [newStudentPhone, setNewStudentPhone] = useState<string>("");
  const [newStudentEmail, setNewStudentEmail] = useState<string>("");
  const [newStudentCourse, setNewStudentCourse] = useState<string>("");
  const [newStudentBranch, setNewStudentBranch] = useState<string>("");
  const [, setNewStudentGender] = useState<string>("");
  const [newStudentAddress, setNewStudentAddress] = useState<string>("");
  const [, setNewStudentBirthday] = useState<string>("");
  const [newStudentLastName, setNewStudentLastName] = useState<string>("");
  const [newStudentFirstName, setNewStudentFirstName] = useState<string>("");
  const [, setNewStudentMiddleName] = useState<string>("");
  const [, setNewStudentLtoClientId] = useState<string>("");
  const [newStudentMarriageLastName, setNewStudentMarriageLastName] = useState<string>("");

  const [notes, setNotes] = useState<any>();
  const [school, setSchool] = useState<any>();
  const [courses, setCourses] = useState<any>();
  const [branches, setBranches] = useState<any>();
  const [vehicles, setVehicles] = useState<any>();
  const [students, setStudents] = useState<any>([]);
  const [attendances, setAttendances] = useState<any>();
  const [updatedBranchId, setUpdatedBranchId] = useState<string>("");

  const { user, handleDrawer } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/school/login");
    }

    schoolService.getSchool(user).then((result) => {
      if (result) {
        console.log("result", result);
        setSchool(result);
        setNotes(result.notes);
        setCourses(result.courses);
        setStudents(result.students);
        setBranches(result.branches);
        setVehicles(result.vehicles);
        setAttendances(result.attendances);
      }
    });
  }, []);

  const [search, setSearch] = useState<string>("");
  const [newCourseName, setNewCourseName] = useState<string>();
  const [newCoursePrice, setNewCoursePrice] = useState<string>();
  const [newBranchAddress, setNewBranchAddress] = useState<string>();
  const [newBranchContactPerson, setNewBranchContactPerson] = useState<string>();
  const [newBranchContactNumber, setNewBranchContactNumber] = useState<string>();
  const [newAttendanceDate, setNewAttendanceDate] = useState<Date>();
  const [newAttendanceTimeIn, setNewAttendanceTimeIn] = useState<string>();
  const [newCourseDescription, setNewCourseDescription] = useState<string>();
  const [newAttendanceTimeOut, setNewAttendanceTimeOut] = useState<string>();
  const [newAttendanceCourseId, setNewAttendanceCourseId] = useState<string>();
  const [newAttendanceBranchId, setNewAttendanceBranchId] = useState<string>();
  const [newAttendanceStudentId, setNewAttendanceStudentId] = useState<string>();

  const [newVehicleModel, setNewVehicleModel] = useState<string>();
  const [newVehicleType, setNewVehicleType] = useState<string>();

  const [updatedBranchAddress, setUpdatedBranchAddress] = useState<string>();

  const createCourse = async () => {
    if (newCourseName && newCourseDescription && newCoursePrice) {
      let newCourse = {
        name: newCourseName,
        description: newCourseDescription,
        price: parseInt(newCoursePrice),
      };
      newCourse = await courseService.createCourse(user, newCourse);
      if (newCourse) {
        if (courses) setCourses([...courses, newCourse]);
        else setCourses([newCourse]);
      }
    }
  };

  const createBranch = async () => {
    if (newBranchAddress) {
      const newBranch = await branchService.createBranch(user, {
        newBranchAddress,
        newBranchContactPerson,
        newBranchContactNumber,
      });
      if (newBranch) {
        if (branches) setBranches([...branches, newBranch]);
        else setBranches([newBranch]);
      }
    }
  };

  const updateBranch = async () => {
    if (updatedBranchAddress) {
      const updatedBranch = await branchService.updateBranch(
        user,
        updatedBranchId,
        updatedBranchAddress,
      );
      if (updatedBranch) {
        let allBranches = branches;
        let updatedBranchIndex = branches.findIndex((x: any) => x._id === updatedBranch._id);
        allBranches[updatedBranchIndex] = updatedBranch;
        setBranches([...allBranches]);
      }
    }
  };

  const createStudent = async () => {
    if (
      (newStudentFirstName && newStudentLastName && newStudentPhone) ||
      (newStudentFirstName && newStudentLastName && newStudentEmail)
    ) {
      let newStudent = {
        school: school._id,
        email: newStudentEmail,
        phone: newStudentPhone,
        course: newStudentCourse,
        branch: newStudentBranch,
        address: newStudentAddress,
        lastName: newStudentLastName,
        firstName: newStudentFirstName,
        marriageLastName: newStudentMarriageLastName,
        isCreatedBySchool: true,
      };

      newStudent = await studentService.createStudent(user, newStudent);

      setStudents([...students, newStudent]);
    }
  };

  const createAttendance = async () => {
    if (
      newAttendanceTimeIn &&
      newAttendanceTimeOut &&
      newAttendanceStudentId &&
      newAttendanceDate
    ) {
      const newAttendance = {
        status: "Credited",
        in: newAttendanceTimeIn,
        out: newAttendanceTimeOut,
        date: newAttendanceDate,
        student: newAttendanceStudentId,
      };

      attendanceService.createAttendance(user, newAttendance);

      setOpenCreateAttendanceModal(false);

      alert("Attendance recorded!");

      setNewAttendanceDate(undefined);
      setNewAttendanceTimeIn(undefined);
      setNewCourseDescription(undefined);
      setNewAttendanceTimeOut(undefined);
      setNewAttendanceCourseId(undefined);
      setNewAttendanceBranchId(undefined);
      setNewAttendanceStudentId(undefined);
    }
  };

  const createVehicle = async () => {
    if (newVehicleModel && newVehicleType) {
      const newVehicle = await vehicleService.createVehicle(user, {
        newVehicleModel,
        newVehicleType,
      });

      if (newVehicle) {
        if (vehicles) setVehicles([...vehicles, newVehicle]);
        else setVehicles([newVehicle]);
      }
    }
  };

  const handleStudentSearch = async () => {
    const result = await studentService.searchStudent(user, search);
    setStudents(result);
  };

  const handleClearStudentSearch = async () => {
    studentService.getAllStudentsBySchoolId(user).then((result) => {
      if (result) {
        setStudents(result);
      }
    });
  };

  const getAllNotesByBranchId = (branchId: string) => {
    const result = notes.filter((i: any) => i.branch !== branchId);
  };

  const printAttendance = () => {};

  const deleteBranch = (branchId: string) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      branchService.deleteBranch(user, branchId);
      const updatedBranchList = branches.filter((x: any) => x._id !== branchId);
      setBranches(updatedBranchList);
    }
  };

  const deleteCourse = (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      // courseService.deleteCourse(user, courseId);
      const updatedCourseList = courses.filter((x: any) => x._id !== courseId);
      setCourses(updatedCourseList);
    }
  };

  const exportSearchResult = () => {};

  const generatePDFReports = () => {
    handleDrawer();
  };

  return (
    <>
      <div className="container-fluid bg-slate-200 h-screen p-6">
        <Tabs aria-label="Default tabs">
          <Tabs.Item
            disabled={!branches || !courses || !students}
            title="Attendance"
            icon={MdDashboard}
          >
            {branches && (
              <div className="">
                <div className="mb-4">
                  <InlineButton
                    placeholder="Record Student Attendance"
                    callback={() => setOpenCreateAttendanceModal(true)}
                  />

                  <InlineButton
                    placeholder="Generate Student Attendance"
                    callback={generatePDFReports}
                  />

                  <br />
                  <br />

                  <Input placeholder="Search name, email, phone" callback={setSearch} />
                  <InlineButton placeholder="Search Student" callback={handleStudentSearch} />
                  <InlineButton placeholder="Clear Search" callback={handleClearStudentSearch} />
                </div>

                <div className="relative overflow-x-auto mb-4">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Branch
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time In
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time Out
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Instructor
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendances?.map(({ student, course, branch, ...attendance }: any) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <a href={`/student/${student._id}`}>
                              {student.firstName} {student.lastName}
                            </a>
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/course/${course._id}`}>{course.name}</a>
                          </td>
                          <td className="px-6 py-4">{branch?.address?.split(", ")[0]}</td>
                          <td className="px-6 py-4">
                            {new Date(attendance.in).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(attendance.out).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(attendance.createdAt).toDateString()}
                          </td>
                          <td className="px-6 py-4">Instructor</td>
                          <td className="px-6 py-4">{attendance.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Tabs.Item>
          <Tabs.Item
            active={branches}
            disabled={!branches || !courses}
            title="Student"
            icon={HiUserCircle}
          >
            {branches && (
              <>
                <div className="mb-4">
                  <InlineButton
                    placeholder="Enroll New Student"
                    callback={() => setOpenStudentModal(true)}
                  />

                  <br />
                  <br />

                  <Input placeholder="Search name, email, phone" callback={setSearch} />
                  <InlineButton placeholder="Search Student" callback={handleStudentSearch} />
                  <InlineButton placeholder="Clear Search" callback={handleClearStudentSearch} />
                  <InlineButton placeholder="Export Search Results" callback={exportSearchResult} />
                  <InlineButton
                    placeholder="Generate Search Result PDF Reports"
                    callback={generatePDFReports}
                  />
                </div>
                <div className="relative overflow-x-auto mb-4">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Student ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Branch
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students?.map((student: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/student/${student?._id}`}>{student.studentId}</a>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={`/student/${student?._id}`}
                            >{`${student?.lastName}, ${student?.firstName} ${student?.middleName ? `,${student?.middleName}` : ""}${student?.marriageLastName ? `${student?.marriageLastName}` : ""}`}</a>
                          </td>
                          <td className="px-6 py-4">{student?.branch?.address?.split(", ")[0]}</td>
                          <td className="px-6 py-4">{student?.email}</td>
                          <td className="px-6 py-4">{student?.phone}</td>
                          <td className="px-6 py-4">{student?.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Tabs.Item>
          {/* <Tabs.Item title="Exams" icon={HiAdjustments}></Tabs.Item> */}
          <Tabs.Item disabled={!branches} title="Course" icon={HiClipboardList}>
            {branches && (
              <div className="mb-4">
                <div className="w-32 mb-4">
                  <Button
                    placeholder="Create Course"
                    callback={() => setOpenCreateCourseModal(true)}
                  />
                </div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          # of Students
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses?.map((course: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/course/${course._id}`}>{course.name}</a>
                          </td>
                          <td className="px-6 py-4">{course.description}</td>
                          <td className="px-6 py-4">{course.price}</td>
                          <td className="px-6 py-4">{course.students.length}</td>
                          <td className="px-6 py-4">
                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => setOpenUpdateCourseModal(true)}
                            >
                              <HiPencil />
                              Edit Course
                            </button>

                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => {
                                setOpenUpdateCourseModal(true);
                              }}
                            >
                              <HiNewspaper />
                              View Notes
                            </button>

                            {course.students.length > 0 ? (
                              <></>
                            ) : (
                              <button
                                className="flex align-middle justify-center items-center text-red-800"
                                onClick={() => deleteCourse(course._id)}
                              >
                                <HiTrash />
                                Delete Course
                              </button>
                            )}
                            {/* <button className="flex align-middle justify-center items-center">
                            <HiStatusOffline />
                            Disable / Enable Course
                          </button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Tabs.Item>
          <Tabs.Item active={!branches} title="Branch" icon={HiClipboardList}>
            <div className="mb-4">
              <div className="w-32 mb-4">
                <Button
                  placeholder="Create Branch"
                  callback={() => setOpenCreateBranchModal(true)}
                />
              </div>

              {!branches && (
                <Alert message={"Create a school branch to get started."} type={"warning"} />
              )}

              {branches && (
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          School Branch Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total # of Students
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches?.map((branches: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <a href={`/branch/${branches._id}`}>{index + 1}</a>
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/branch/${branches._id}`} className="block text-lg mb-2">
                              Address: {branches.address}
                            </a>
                            <a href={`/branch/${branches._id}`} className="block">
                              Contact Person: {branches?.contactPerson}
                            </a>
                            <a href={`/branch/${branches._id}`} className="block">
                              Contact Number: {branches?.contactNumber}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <span className="block font-bold">No. of students each course</span>
                            {courses?.map((i: any) => (
                              <span className="block">
                                {i?.name}:{" "}
                                {
                                  i?.students?.filter((j: string) => branches.students.includes(j))
                                    .length
                                }
                              </span>
                            ))}
                            <span className="block"></span>
                            <span className="block"></span>
                            <br />
                            <span className="block font-bold">
                              Total: {branches.students.length}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => {
                                setOpenUpdateBranchModal(true);
                                setUpdatedBranchId(branches._id); // * get the specific branch id
                              }}
                            >
                              <HiPencil />
                              Edit Branch
                            </button>
                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => {
                                getAllNotesByBranchId(branches._id);
                                // setOpenBranchNotesModal(true);
                                // setUpdatedBranchId(branches._id); // * get the specific branch id
                              }}
                            >
                              <HiNewspaper />
                              View Notes
                            </button>

                            {branches.students.length > 0 ? (
                              <></>
                            ) : (
                              <button
                                onClick={() => deleteBranch(branches._id)}
                                className="flex align-middle justify-center items-center text-red-800"
                              >
                                <HiTrash />
                                Delete Branch
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item active={!vehicles} title="Vehicle" icon={MdDirectionsCar}>
            <div className="mb-4">
              <div className="w-32 mb-4">
                <Button
                  placeholder="Register vehicle"
                  callback={() => setOpenCreateVehicleModal(true)}
                />
              </div>

              {!branches && (
                <Alert message={"Create a school branch to get started."} type={"warning"} />
              )}

              {branches && (
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Vehicle Model & Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Registration Expiration
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Plate Number
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Validity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles?.map((i: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <a href={`/vehicle/${i._id}`}>{index + 1}</a>
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/vehicle/${i._id}`} className="block text-lg mb-2">
                              {i.model}
                            </a>
                            {/* <a href={`/vehicle/${i._id}`} className="block">
                              Contact Person: {i?.contactPerson}
                            </a>
                            <a href={`/vehicle/${i._id}`} className="block">
                              Contact Number: {i?.contactNumber}
                            </a> */}
                          </td>
                          <td className="px-6 py-4">{i.type}</td>
                          <td className="px-6 py-4">{i?.plateNumber}</td>
                          <td className="px-6 py-4">{i?.validity}</td>
                          <td className="px-6 py-4">
                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => {
                                setOpenUpdateBranchModal(true);
                                setUpdatedBranchId(branches._id); // * get the specific branch id
                              }}
                            >
                              <HiPencil />
                              Edit Vehicle
                            </button>
                            <button
                              className="flex align-middle justify-center items-center bg-black text-white px-2 py-1 rounded-md mb-2"
                              onClick={() => {
                                getAllNotesByBranchId(branches._id);
                                // setOpenBranchNotesModal(true);
                                // setUpdatedBranchId(branches._id); // * get the specific branch id
                              }}
                            >
                              <HiNewspaper />
                              View Notes
                            </button>

                            {branches?.students?.length > 0 ? (
                              <></>
                            ) : (
                              <button
                                onClick={() => deleteBranch(branches._id)}
                                className="flex align-middle justify-center items-center text-red-800"
                              >
                                <HiTrash />
                                Delete Vehicle
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Tabs.Item>
        </Tabs>

        {/* Create Branch Modal */}
        <Modal show={openCreateBranchModal} onClose={() => setOpenCreateBranchModal(false)}>
          <Modal.Header>New Branch</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Branch Address</label>
                <Input callback={setNewBranchAddress} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Branch Contact Person</label>
                <Input callback={setNewBranchContactPerson} placeholder="Optional" />
              </div>
              <div className="mb-2">
                <label htmlFor="">Branch Contact Number</label>
                <Input callback={setNewBranchContactNumber} placeholder="Optional" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Create Branch"
              callback={() => {
                createBranch();
                setOpenCreateBranchModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenCreateBranchModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* Update Branch Modal */}
        <Modal show={openUpdateBranchModal} onClose={() => setOpenUpdateBranchModal(false)}>
          <Modal.Header>Update Branch</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Branch Address</label>
                <Input callback={setUpdatedBranchAddress} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Update Branch"
              callback={() => {
                updateBranch();
                setOpenUpdateBranchModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenUpdateBranchModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* Create Course Modal */}
        <Modal show={openCreateCourseModal} onClose={() => setOpenCreateCourseModal(false)}>
          <Modal.Header>New Course</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Course Name</label>
                <Input callback={setNewCourseName} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Course Description</label>
                <Input callback={setNewCourseDescription} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Course Cost</label>
                <Input callback={setNewCoursePrice} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Create Course"
              callback={() => {
                createCourse();
                setOpenCreateCourseModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenCreateCourseModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* Update Course Modal */}
        <Modal show={openUpdateCourseModal} onClose={() => setOpenUpdateCourseModal(false)}>
          <Modal.Header>Update Course</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Course Name</label>
                <Input callback={setNewCourseName} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Course Description</label>
                <Input callback={setNewCourseDescription} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Course Cost</label>
                <Input callback={setNewCoursePrice} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Update Course"
              callback={() => {
                // updateCourse();
                setOpenUpdateCourseModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenUpdateCourseModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* New Student */}
        <Modal show={openStudentModal} onClose={() => setOpenStudentModal(false)}>
          <Modal.Header>New Student</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Student First name</label>
                <Input callback={setNewStudentFirstName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Middle Name</label>
                <Input callback={setNewStudentMiddleName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Last Name</label>
                <Input callback={setNewStudentLastName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Marriage Last Name</label>
                <Input callback={setNewStudentMarriageLastName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Email</label>
                <Input callback={setNewStudentEmail} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Phone</label>
                <Input callback={setNewStudentPhone} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Address</label>
                <Input callback={setNewStudentAddress} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Birthday</label>
                <Input callback={setNewStudentBirthday} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Gender</label>
                <Select
                  onChange={(e) => {
                    setNewStudentGender(e.target.value);
                  }}
                  required
                >
                  <option>Pick your gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>

              <div className="mb-2">
                <label htmlFor="">Student LTO Client ID</label>
                <Input callback={setNewStudentLtoClientId} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Courses</label>
                <Select
                  onChange={(e) => {
                    setNewStudentCourse(e.target.value);
                  }}
                  required
                >
                  <option>Select a course</option>
                  {courses?.map((i: any) => <option value={i._id}>{i.name}</option>)}
                </Select>
              </div>

              <div className="mb-2">
                <label htmlFor="">Select Branch</label>
                <Select
                  onChange={(e) => {
                    setNewStudentBranch(e.target.value);
                  }}
                  required
                >
                  <option>Select a branch</option>
                  {branches?.map((i: any) => <option value={i._id}>{i.address}</option>)}
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Enroll Student"
              callback={() => {
                createStudent();
                setOpenStudentModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenStudentModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* print attendance */}
        <Modal show={openAttendanceModal} onClose={() => setOpenAttendanceModal(false)}>
          <Modal.Header>Print Attendance</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Select Branch</label>
                <Input callback={setNewCourseName} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Select Course</label>
                <Input callback={setNewCourseDescription} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Select Date</label>
                <Input callback={setNewCoursePrice} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Print Attendance"
              callback={() => {
                printAttendance();
                setOpenAttendanceModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenAttendanceModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* create attendance */}
        <Modal show={openCreateAttendanceModal} onClose={() => setOpenCreateAttendanceModal(false)}>
          <Modal.Header>Record Student Attendance</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Student ID</label>
                <Input type="text" placeholder="eg. 2400001" callback={setNewAttendanceStudentId} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Student Time In</label>
                <Input type="time" placeholder="test" callback={setNewAttendanceTimeIn} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Student Time Out</label>
                <Input type="time" placeholder="test" callback={setNewAttendanceTimeOut} />
              </div>
              <label htmlFor="">Date Attended</label>
              <div className="mb-2">
                <Datepicker
                  onSelectedDateChanged={(e: Date) => {
                    setNewAttendanceDate(e);
                  }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button placeholder="Confirm Attendance Record" callback={createAttendance} />
          </Modal.Footer>
        </Modal>

        {/* Enroll Student */}
        <Modal show={openStudentModal} onClose={() => setOpenStudentModal(false)}>
          <Modal.Header>New Student</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Student First name</label>
                <Input callback={setNewStudentFirstName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Last Name</label>
                <Input callback={setNewStudentLastName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Marriage Last Name</label>
                <Input callback={setNewStudentMarriageLastName} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Email</label>
                <Input callback={setNewStudentEmail} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Phone</label>
                <Input callback={setNewStudentPhone} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Student Address</label>
                <Input callback={setNewStudentAddress} />
              </div>

              <div className="mb-2">
                <label htmlFor="">Courses</label>
                <Select
                  onChange={(e) => {
                    setNewStudentCourse(e.target.value);
                  }}
                  required
                >
                  <option>Select a course</option>
                  {courses?.map((i: any) => <option value={i._id}>{i.name}</option>)}
                </Select>
              </div>

              <div className="mb-2">
                <label htmlFor="">Select Branch</label>
                <Select
                  onChange={(e) => {
                    setNewStudentBranch(e.target.value);
                  }}
                  required
                >
                  <option>Select a branch</option>
                  {branches?.map((i: any) => <option value={i._id}>{i.address}</option>)}
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Enroll Student"
              callback={() => {
                createStudent();
                setOpenStudentModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenStudentModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* Branch Notes */}
        <Modal show={openBranchNotesModal} onClose={() => setOpenBranchNotesModal(false)}>
          <Modal.Header>Branch Notes</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">...</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Enroll Student"
              callback={() => {
                createStudent();
                setOpenStudentModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenStudentModal(false)} />
          </Modal.Footer>
        </Modal>

        {/* Create vehicle */}
        <Modal show={openCreateVehicleModal} onClose={() => setOpenCreateVehicleModal(false)}>
          <Modal.Header>New Vehicle</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-2">
                <label htmlFor="">Vehicle Model</label>
                <Input callback={setNewVehicleModel} />
              </div>
              <div className="mb-2">
                <label htmlFor="">Vehicle Type</label>
                <Input callback={setNewVehicleType} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              placeholder="Register Vehicle"
              callback={() => {
                createVehicle();
                setOpenCreateVehicleModal(false);
              }}
            />
            <Button placeholder="Decline" callback={() => setOpenCreateVehicleModal(false)} />
          </Modal.Footer>
        </Modal>
      </div>

      <OffPage />
    </>
  );
}
