
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

export default function AdminPage() {
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
  const [, setName] = useState<string>('Driving School Company, Inc.')
  const [, setAddress] = useState<string>('City, Province')
  const [, setPhone] = useState<string>('+63 xxx xxx xxxx')
  const [, setEmail] = useState<string>('email@example.com')


  const [newStudentFirstName, setNewStudentFirstName] = useState<string>('')
  const [newStudentMiddleName, setNewStudentMiddleName] = useState<string>('')
  const [newStudentLastName, setNewStudentLastName] = useState<string>('')
  const [newStudentMarriageLastName, setNewStudentMarriageLastName] = useState<string>('')
  const [newStudentPhone, setNewStudentPhone] = useState<string>('')
  const [newStudentAddress, setNewStudentAddress] = useState<string>('')
  const [newStudentEmail, setNewStudentEmail] = useState<string>('')
  const [newStudentPassword, setNewStudentPassword] = useState<string>('')
  const [newStudentCourse, setNewStudentCourse] = useState<string>('')
  const [newStudentBranch, setNewStudentBranch] = useState<string>('')
  const [newStudentLtoClientId, setNewStudentLtoClientId] = useState<string>('')

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
        if (result) {
          setBranches(result)
        }
      })

    courseService.getAllCoursesBySchoolId(user)
      .then(result => {
        if (result) {
          setCourses(result)
        }
      })

    studentService.getAllStudentsBySchoolId(user)
      .then(result => {
        if (result) {
          setStudents(result)
        }
      })

      attendanceService.getAllAttendancesBySchoolId(user)
        .then(result => {
          if (result) {
            setAttendances(result)
          }
        })
  }, [])

  const [search, setSearch] = useState<string>('')

  const [newBranchAddress, setNewBranchAddress] = useState<string>()

  const [newCourseName, setNewCourseName] = useState<string>()
  const [newCourseDescription, setNewCourseDescription] = useState<string>()
  const [newCoursePrice, setNewCoursePrice] = useState<string>()
  
  const createCourse = async () => {
    if (newCourseName && newCourseDescription && newCoursePrice) {
      let newCourse = {
        name: newCourseName,
        description: newCourseDescription,
        price: parseInt(newCoursePrice),
      }
      newCourse = await courseService.createCourse({ ...newCourse, user })
      if (newCourse) setCourses([...courses, newCourse])
      alert('New course has been created!')
    }
  }

  const createBranch = async () => {
    if (newBranchAddress) {
      const newBranch = await branchService.createBranch(user, newBranchAddress)
      if (newBranch) {
        setBranches([...branches, newBranch])
        alert('New branch has been created!')
      }
    }
  }

  const createStudent = async () => {
    if (newStudentFirstName && newStudentLastName && newStudentPhone && newStudentEmail && newStudentPassword) {
      const newStudent = {
        email: newStudentEmail,
        address: newStudentAddress,
        password: newStudentPassword,
        firstName: newStudentFirstName,
        middleName: newStudentMiddleName,
        lastName: newStudentLastName,
        marriageLastName: newStudentMarriageLastName,
        phone: newStudentPhone,
        school: school._id,
        ltoClientId: newStudentLtoClientId,
        branch: newStudentBranch,
        course: newStudentCourse,
      }
      const result = await studentService.createStudent(user, newStudent)
      alert('New student has been enrolled!')
      navigate('/admin')
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

  const printAttendance = () => {}

  return (
    <div className="container-fluid bg-slate-200 p-6">
      {/* <div className="mb-2">
        <label htmlFor="">Name</label>
        <Input callback={setName} />
      </div>
      <div className="mb-2">
        <label htmlFor="">Address</label>
        <Input callback={setAddress} />
      </div>
      <div className="mb-2">
        <label htmlFor="">Phone Number</label>
        <Input callback={setPhone} />
      </div>   
      <div className="mb-2">
        <label htmlFor="">Email</label>
        <Input callback={setEmail} />
      </div> */}

      {/* Branches */}
      <div className="mb-4">
        <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">Branches</h1>
            <div className="w-32">
              <Button placeholder="Create Branch" callback={() => setOpenBranchModal(true)} />
            </div>
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
                        # of Students
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                        Profit
                    </th> */}
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
                    {/* <td className="px-6 py-4">
                      {course.price * course.students.length}
                    </td> */}
                </tr>
                ))
              }
            </tbody>
        </table>
      </div>

      </div>

      {/* Courses */}
      {
        branches && 
        <div className="mb-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Courses</h1>
            <div className="w-32">
              <Button placeholder="Create Course" callback={() => setOpenCourseModal(true)} />
            </div>
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
                      {/* <th scope="col" className="px-6 py-3">
                          Profit
                      </th> */}
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
                      {/* <td className="px-6 py-4">
                        {course.price * course.students.length}
                      </td> */}
                  </tr>
                  ))
                }
              </tbody>
          </table>
        </div>
  
        </div>
      }
      
      {/* Students */}
      {
        branches &&
        <>
          <div className="mb-4">
            
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Students</h1>
              <div className="w-40">
                <Button placeholder="Enroll New Student" callback={() => setOpenStudentModal(true)} />
              </div>
          </div>
            <Input placeholder="Search name, email, phone" callback={setSearch} />
            <Button placeholder="Search Student" callback={handleStudentSearch} />
            <Button placeholder="Clear Search" callback={handleClearStudentSearch} />
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
                            {`${student.lastName}, ${student.firstName}, ${student.middleName}${student.marriageLastName ? `, ${student.marriageLastName}`:''}`}
                          </a>
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

      {/* Attendance */}
      {
        branches && 
        <div className="mt-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-2">Attendances</h1>
            <div className="w-36">
              <Button placeholder="Print Attendance" callback={() => setOpenAttendanceModal(true)} />
            </div>
        </div>
          <div className="relative overflow-x-auto">
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
                  </tr>
              </thead>
              <tbody>
                {
                  attendances?.map(({ student, course, branch, ...attendance }: any) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <a href={`/attendance`}>
                          {student.name}
                        </a>
                      </th>
                      <td className="px-6 py-4">
                        {course.name}
                      </td>
                      <td className="px-6 py-4">
                        {branch.name}
                      </td>
                      <td className="px-6 py-4">
                        {attendance.in}
                      </td>
                      <td className="px-6 py-4">
                        {attendance.out}
                      </td>
                  </tr>
                  ))
                }
              </tbody>
          </table>
        </div>
  
        </div>
      }

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
            <label htmlFor="">Student LTO Client ID</label>
            <Input callback={setNewStudentLtoClientId} />
          </div>

          <div className="mb-2">
            <label htmlFor="">Student Password</label>
            <Input callback={setNewStudentPassword} />
          </div>

          <div className="mb-2">
            <label htmlFor="">Student Re-Password</label>
            <Input callback={setNewStudentPassword} />
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
    </div>
    
  )
}
