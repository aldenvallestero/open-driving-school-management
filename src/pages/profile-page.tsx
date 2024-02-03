import { useState } from 'react'
import { DownloadIcon } from '../components/icons-component'

export default function ProfilePage() {

  const [name] = useState<string>('First Last')
  const [address] = useState<string>('City, Province')
  const [phone] = useState<string>('+63 xxx xxx xxxx')
  const [gender] = useState<string>('Gender')
  const [birthday] = useState<string>('Month 01, 1999')
  const [ltoClientId] = useState<string>('XX-XXXXXX-XXXXXXX')
  const [status] = useState<string>('PDC - Passed')

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

  return (
    <div className="container-fluid bg-slate-200 p-6">
      <h1 className="font-bold text-3xl">{name}</h1>
      <span className="bg-green-600 text-white font-bold px-2 py-1 rounded-sm">{status}</span>

      <div className="block p-4 my-6">
        <h1 className="font-bold">Personal Information</h1>
        <span className="block">Address: {address}</span>
        <span className="block">Phone: {phone}</span>
        <span className="block">Gender: {gender}</span>
        <span className="block">Birthday: {birthday}</span>
        <span className="block">LTO Client ID: {ltoClientId}</span>
        <span className="block">Enrollment Date: {new Date().toDateString()}</span>
      </div>


      {
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
      }
    </div>
    
  )
}
