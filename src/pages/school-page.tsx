
import { Tabs } from 'flowbite-react';
import { Datepicker } from 'flowbite-react';
import { MdDashboard } from 'react-icons/md';
import { Modal, Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/input-component'
import { UserContext } from '../contexts/Context'
import Button from '../components/button-component'
import SchoolService from '../services/school-service'
import BranchService from '../services/branch-service'
import CourseService from '../services/course-service'
import { useContext, useEffect, useState } from 'react'
import StudentService from '../services/student-service'
import AttendanceService from '../services/attendance-service'
import InlineButton from '../components/inline-button-component';
import { HiTrash, HiPencil, HiClipboardList, HiUserCircle, HiStatusOffline } from 'react-icons/hi';

export default function SchoolPage() {
  const schoolService = new SchoolService()
  const branchService = new BranchService()
  const courseService = new CourseService()
  const studentService = new StudentService()
  const attendanceService = new AttendanceService()
  const navigate = useNavigate()
  const [openBranchModal, setOpenBranchModal] = useState<boolean>(false)
  const [openCourseModal, setOpenCourseModal] = useState<boolean>(false)
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false)
  const [openAttendanceModal, setOpenAttendanceModal] = useState<boolean>(false)
  const [openCreateAttendanceModal, setOpenCreateAttendanceModal] = useState<boolean>(false)
  const [, setName] = useState<string>('Driving School Company, Inc.')
  const [, setAddress] = useState<string>('City, Province')
  const [, setPhone] = useState<string>('+63 xxx xxx xxxx')
  const [, setEmail] = useState<string>('email@example.com')



  const [newStudentPhone, setNewStudentPhone] = useState<string>('')
  const [newStudentEmail, setNewStudentEmail] = useState<string>('')
  const [newStudentCourse, setNewStudentCourse] = useState<string>('')
  const [newStudentBranch, setNewStudentBranch] = useState<string>('')
  const [newStudentGender, setNewStudentGender] = useState<string>('')
  const [newStudentAddress, setNewStudentAddress] = useState<string>('')
  const [newStudentPassword, setNewStudentPassword] = useState<string>('')
  const [newStudentBirthday, setNewStudentBirthday] = useState<string>('')
  const [newStudentLastName, setNewStudentLastName] = useState<string>('')
  const [newStudentFirstName, setNewStudentFirstName] = useState<string>('')
  const [newStudentMiddleName, setNewStudentMiddleName] = useState<string>('')
  const [newStudentLtoClientId, setNewStudentLtoClientId] = useState<string>('')
  const [newStudentMarriageLastName, setNewStudentMarriageLastName] = useState<string>('')

  const [school, setSchool] = useState<any>()
  const [courses, setCourses] = useState<any>()
  const [branches, setBranches] = useState<any>()
  const [students, setStudents] = useState<any>()
  const [attendances, setAttendances] = useState<any>()

  const [user] = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigate('/school/login')
    }

    schoolService.getSchool(user)
      .then(result => {
        if (result) {
          setSchool(result)
        }
      })

    branchService.getAllBranchesBySchoolId(user)
      .then(result => {
        if (result?.length > 0) {
          setBranches(result)
        }
      })

    courseService.getAllCoursesBySchoolId(user)
      .then(result => {
        if (result?.length > 0) {
          setCourses(result)
        }
      })

    studentService.getAllStudentsBySchoolId(user)
      .then(result => {
        if (result?.length > 0) {
          setStudents(result)
        }
      })

    attendanceService.getAllAttendancesBySchoolId(user)
      .then(result => {
        if (result) {
          console.log(result)
          setAttendances(result)
        }
      })
  }, [])

  const [search, setSearch] = useState<string>('')
  const [newCourseName, setNewCourseName] = useState<string>()
  const [newCoursePrice, setNewCoursePrice] = useState<string>()
  const [newBranchAddress, setNewBranchAddress] = useState<string>()
  const [newAttendanceDate, setNewAttendanceDate] = useState<Date>()
  const [newAttendanceTimeIn, setNewAttendanceTimeIn] = useState<string>()
  const [newCourseDescription, setNewCourseDescription] = useState<string>()
  const [newAttendanceTimeOut, setNewAttendanceTimeOut] = useState<string>()
  const [newAttendanceCourseId, setNewAttendanceCourseId] = useState<string>()
  const [newAttendanceBranchId, setNewAttendanceBranchId] = useState<string>()
  const [newAttendanceStudentId, setNewAttendanceStudentId] = useState<string>()
  
  const createCourse = async () => {
    if (newCourseName && newCourseDescription && newCoursePrice) {
      let newCourse = {
        name: newCourseName,
        description: newCourseDescription,
        price: parseInt(newCoursePrice),
      }
      newCourse = await courseService.createCourse({ ...newCourse, user })
      if (newCourse) {
        if (courses) setCourses([...courses, newCourse])
        else setCourses([newCourse])
      }
    }
  }

  const createBranch = async () => {
    if (newBranchAddress) {
      const newBranch = await branchService.createBranch(user, newBranchAddress)
      if (newBranch) {
        if (branches) setBranches([...branches, newBranch])
        else setBranches([newBranch])
      }
    }
  }

  const createStudent = async () => {
    if (newStudentFirstName && newStudentLastName && newStudentPhone && newStudentEmail && newStudentPassword) {
      const newStudent = {
        school: school._id,
        email: newStudentEmail,
        phone: newStudentPhone,
        course: newStudentCourse,
        branch: newStudentBranch,
        gender: newStudentGender,
        address: newStudentAddress,
        lastName: newStudentLastName,
        birthday: newStudentBirthday,
        password: newStudentPassword,
        firstName: newStudentFirstName,
        middleName: newStudentMiddleName,
        ltoClientId: newStudentLtoClientId,
        marriageLastName: newStudentMarriageLastName,
      }
      studentService.createStudent(user, newStudent)
      navigate('/school')
    }
  }

  const createAttendance = async () => {
    if (newAttendanceTimeIn && newAttendanceTimeOut && newAttendanceCourseId && newAttendanceStudentId && newAttendanceDate && newAttendanceBranchId) {
      const newAttendance = {
        status: 'Credited',
        in: newAttendanceTimeIn,
        out: newAttendanceTimeOut,
        date: newAttendanceDate,
        course: newAttendanceCourseId,
        branch: newAttendanceBranchId,
        student: newAttendanceStudentId,
      }

      attendanceService.createAttendance(user, newAttendance)
      alert('Attendance recorded!')

      setNewAttendanceDate(undefined)
      setNewAttendanceTimeIn(undefined)
      setNewCourseDescription(undefined)
      setNewAttendanceTimeOut(undefined)
      setNewAttendanceCourseId(undefined)
      setNewAttendanceBranchId(undefined)
      setNewAttendanceStudentId(undefined)
    }
  }

  const handleStudentSearch = async () => {
    const result = await studentService.searchStudent(user, search)
    setStudents(result)
  }

  const handleClearStudentSearch = async () => {
    studentService.getAllStudentsBySchoolId(user)
      .then(result => {
        if (result) {
          setStudents(result)
        }
      })
  }

  const handleAttendanceDateFilter = (e: Date) => {
    console.log(e.getFullYear())

    console.log(e.getMonth())

    console.log(e.getDay())
  }

  const printAttendance = () => {}

  const deleteBranch = (branchId: any) => {
    if (window.confirm('U sure?')) {
      branchService.deleteBranch(user, branchId)
      const newBranches = branches.filter((x: any) => x._id !== branchId);
      setBranches(newBranches)
    }
  }


  return (
    <div className="container-fluid bg-slate-200 h-screen p-6">
      <Tabs aria-label="Default tabs" style="default">
        
        <Tabs.Item disabled={!branches || !courses || !students} title="Attendance" icon={MdDashboard}>
          {
            branches &&
            <div className="">
              <div className="mb-4">
              <InlineButton placeholder="Record Student Attendance" callback={() => setOpenCreateAttendanceModal(true)} />

              <br /><br />
              
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
                          {/* <th scope="col" className="px-6 py-3">
                            Instructor
                          </th> */}
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        attendances?.map(({ student, course, branch, ...attendance }: any) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <a href={`/attendance`}>
                                {student.firstName} {student.lastName}
                              </a>
                            </th>
                            <td className="px-6 py-4">
                              {course.name}
                            </td>
                            <td className="px-6 py-4">
                              {branch.address.split(', ')[0]}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(attendance.in).toLocaleTimeString()}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(attendance.out).toLocaleTimeString()}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(attendance.createdAt).toDateString()}
                            </td>
                            {/* <td className="px-6 py-4">
                            Instructor
                            </td> */}
                            <td className="px-6 py-4">
                              {attendance.status}
                            </td>
                        </tr>
                        ))
                      }
                    </tbody>
                </table>
              </div>
      
            </div>
          }
        </Tabs.Item>
        <Tabs.Item active={branches} disabled={!branches || !courses} title="Student" icon={HiUserCircle}>
          {
            branches &&
            <>
              <div className="mb-4">
                <InlineButton placeholder="Enroll New Student" callback={() => setOpenStudentModal(true)} />

                <br /><br />
                
                <Input placeholder="Search name, email, phone" callback={setSearch} />
                <InlineButton placeholder="Search Student" callback={handleStudentSearch} />
                <InlineButton placeholder="Clear Search" callback={handleClearStudentSearch} />
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
                    {
                      students?.map((student: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/student/${student._id}`}>
                              {student.studentId}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <a href={`/student/${student._id}`}>
                              {`${student.lastName}, ${student.firstName}, ${student.middleName}${student.marriageLastName ? `, ${student.marriageLastName}`:''}`}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            {student.branch.address.split(', ')[0]}
                          </td>
                          <td className="px-6 py-4">
                            {student.email}
                          </td>
                          <td className="px-6 py-4">
                            {student.phone}
                          </td>
                          <td className="px-6 py-4">
                            {student.status}
                          </td>
                      </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          }
        </Tabs.Item>
        {/* <Tabs.Item title="Enrollment" icon={HiAdjustments}>
          This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item> */}
        <Tabs.Item disabled={!branches} title="Course" icon={HiClipboardList}>
          {
            branches && 
            <div className="mb-4">
            <div className="w-32 mb-4">
              <Button placeholder="Create Course" callback={() => setOpenCourseModal(true)} />
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
                    {
                      courses?.map((course: any, index: number) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <a href={`/course/${course._id}`}>
                              {course.name}
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            {course.description}
                          </td>
                          <td className="px-6 py-4">
                            {course.price}
                          </td>
                          <td className="px-6 py-4">
                            {course.students.length}
                          </td>
                          <td className="px-6 py-4">
                            <button className="flex align-middle justify-center items-center"><HiPencil />Edit Course</button>
                            <button className="flex align-middle justify-center items-center"><HiTrash />Delete Course</button>
                            <button className="flex align-middle justify-center items-center"><HiStatusOffline />Disable / Enable Course</button>
                          </td>
                      </tr>
                      ))
                    }
                  </tbody>
              </table>
            </div>
      
            </div>
          }
        </Tabs.Item>
        <Tabs.Item active={!branches} title="Branch" icon={HiClipboardList}>
          <div className="mb-4">
            <div className="w-32 mb-4">
              <Button placeholder="Create Branch" callback={() => setOpenBranchModal(true)} />
            </div>
            <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
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
                  {
                    branches?.map((branches: any, index: number) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <a href={`/branch/${branches._id}`}>
                            {index + 1}
                          </a>
                        </th>
                        <td className="px-6 py-4">
                        <a href={`/branch/${branches._id}`}>
                            {branches.address}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          {branches.students.length}
                        </td>
                        <td className="px-6 py-4">
                          
                        <button className="flex align-middle justify-center items-center"><HiPencil />Edit Branch</button>
                            {/* <button className="flex align-middle justify-center items-center"><HiStatusOffline />Disable / Enable Branch</button> */}
                            
                            {
                              branches.students.length > 0 ? <></> : <button onClick={() => deleteBranch(branches._id)} className="flex align-middle justify-center items-center text-red-800"><HiTrash />Delete Branch</button>
                            }
                        </td>
                    </tr>
                    ))
                  }
                </tbody>
            </table>
          </div>

          </div>
        </Tabs.Item>
      </Tabs>

      {/* MODALS */}
      <Modal show={openBranchModal} onClose={() => setOpenBranchModal(false)}>
        <Modal.Header>New Branch</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="mb-2">
              <label htmlFor="">Branch Address</label>
              <Input callback={setNewBranchAddress} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button placeholder="Create Branch" callback={() => { createBranch(); setOpenBranchModal(false)} } />
          <Button placeholder="Decline" callback={() => setOpenBranchModal(false)} />
        </Modal.Footer>
      </Modal>

      {/* course */}
      <Modal show={openCourseModal} onClose={() => setOpenCourseModal(false)}>
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
          <Button placeholder="Create Course" callback={() => { createCourse(); setOpenCourseModal(false)} } />
          <Button placeholder="Decline" callback={() => setOpenCourseModal(false)} />
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
              <Select onChange={(e) => { setNewStudentGender(e.target.value) }} required>
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
              <label htmlFor="">Student Password</label>
              <Input type="password" callback={setNewStudentPassword} />
            </div>

            <div className="mb-2">
              <label htmlFor="">Student Re-Password</label>
              <Input type="password" callback={setNewStudentPassword} />
            </div>

            <div className="mb-2">
              <label htmlFor="">Courses</label>
              <Select onChange={(e) => { setNewStudentCourse(e.target.value) }} required>
                <option>Select a course</option>
              {
                courses?.map((i: any) => (
                  <option value={i._id}>{i.name}</option>
                ))
              }
              </Select>
            </div>

            <div className="mb-2">
              <label htmlFor="">Select Branch</label>
              <Select onChange={(e) => { setNewStudentBranch(e.target.value) }} required>
                <option>Select a branch</option>
              {
                branches?.map((i: any) => (
                  <option value={i._id}>{i.address}</option>
                ))
              }
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button placeholder="Enroll Student" callback={() => { createStudent(); setOpenStudentModal(false)} } />
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
          <Button placeholder="Print Attendance" callback={() => { printAttendance(); setOpenAttendanceModal(false)} } />
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
              <label htmlFor="">Student Course</label>
              <Select onChange={(e) => { setNewAttendanceCourseId(e.target.value) }} required>
                <option>Select a course</option>
              {
                courses?.map((i: any) => (
                  <option value={i._id}>{i.name}</option>
                ))
              }
              </Select>
            </div>
            <div className="mb-2">
            <label htmlFor="">Student Branch</label>
              <Select onChange={(e) => { setNewAttendanceBranchId(e.target.value) }} required>
                <option>Select a branch</option>
              {
                branches?.map((i: any) => (
                  <option value={i._id}>{i.address}</option>
                ))
              }
              </Select>
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
              <Datepicker onSelectedDateChanged={(e: Date) => { setNewAttendanceDate(e) }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button placeholder="Record" callback={() => { createAttendance(); setOpenCreateAttendanceModal(false)} } />
          <Button placeholder="Decline" callback={() => setOpenCreateAttendanceModal(false)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
