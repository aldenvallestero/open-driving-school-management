import { UserContext } from '../contexts/Context'
import { useContext, useEffect, useState } from 'react'
import StudentService from '../services/student-service'
import { useNavigate, useParams } from 'react-router-dom'

export default function StudentPage() {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const { studentId } = useParams();
  const studentService = new StudentService()

  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [gender] = useState<string>('Gender')
  const [birthday] = useState<string>('Month 01, 1999')
  const [ltoClientId, setLtoClientId] = useState<string>('XX-XXXXXX-XXXXXXX')
  const [status, setStatus] = useState<string>('PDC - Passed')

  
  const [courses, setCourses] = useState<any>()
  const [enrollment, setEnrollment] = useState<any>()

  const [history] = useState([
    {
      description: 'PDC Exam passed!',
      date: new Date().toDateString(),
      files: [{ name: 'PDC Exam Paper' }, { name: 'TDC Reviewer' }],
    },
    {
      description: 'PDC Exam failed!',
      date: new Date().toDateString(),
    },
    {
      description: 'TDC Exam passed!',
      date: new Date().toDateString(),
    },
    {
      description: 'TDC Exam failed!',
      date: new Date().toDateString(),
    },
    {
      description: 'Enrolled!',
      date: new Date().toDateString(),
    },
  ])

  useEffect(() => {
    if (!user) {
      navigate('/student/login')
      return
    }

    if (studentId) {
      studentService.getStudentById(studentId, user)
        .then((result: any) => {
          if (result) {
            setName(`${result.lastName}, ${result.firstName}, ${result.middleName}${result.marriageLastName ? `, ${result.marriageLastName}`:''}`)
            setAddress(result?.address)
            setPhone(result?.phone)
            setLtoClientId(result?.ltoClientId)
            setStatus(result?.status)
            setCourses(result.courses)
            setEnrollment(result.enrollment)
          }
        })
    } else {
      studentService.getStudent(user)
        .then((result: any) => {
          if (result) {
            setName(result?.name)
            setAddress(result?.address)
            setPhone(result?.phone)
            setLtoClientId(result?.ltoClientId)
            setStatus(result?.status)
          }
        })
    }
  }, [])

  return (
    <div className="container-fluid bg-slate-200 p-6">
      <h1 className="font-bold text-3xl">{name}</h1>
      <span className="bg-green-600 text-white font-bold px-2 py-1 rounded-sm">{status}</span>

      <div className="block p-4 my-6">
        <h1 className="font-bold">Personal Information</h1>
        <span className="block">Address: {address}</span>
        <span className="block">Phone: {phone}</span>
        {/* <span className="block">Gender: {gender}</span> */}
        <span className="block">Birthday: {birthday}</span>
        <span className="block">LTO Client ID: {ltoClientId}</span>
        <span className="block">Enrollment Date: {new Date().toDateString()}</span>
      </div>


      {/* {
        history?.map(tnx => (
          <div className="block shadow-md border-s-8 border-blue-800 rounded-md p-4 mb-4">
            <span className="block mb-2">{tnx.description}</span>
            {
              tnx?.files?.map(file => (
                <div className="inline-block mx-1">
                  <button className="flex items-center bg-gray-400 px-2 py-1 rounded-md">
                    <DownloadIcon />
                    <small className="ms-1">{file.name}</small>
                  </button>
                </div>
              ))
            }
            <small className="block text-gray-600 mt-4">{tnx.date}</small>
          </div>
        ))
      } */}
      
      <div className="block shadow-md border-s-8 border-blue-800 rounded-md p-4 mb-4">
        <h1 className="font-bold text-1xl block mb-2">Courses</h1>
        {
          enrollment?.map((i: any) => (
            <>
              <h1 className="block font-bold mt-4">{i.course.name}</h1>
              <p className="block mt-4">{i.status}</p>
              <p className="block mt-4">{i.createdAt}</p>
              <p className="block mt-4">Exam Score: 99.8%</p>

              <p className="block mt-4">Click here to see attendance</p>
            </>
          ))
        }
      </div>
    </div>
    
  )
}
