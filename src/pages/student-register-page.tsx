import Input from '../components/input-component'
import Button from '../components/button-component'
import { useState } from 'react'
import Radio from '../components/radio-component'
import { TRegister } from '../commons/type-common'
import StudentService from '../services/student-service'

export default function StudentRegisterPage() {

  const [firstName, setFirstName] = useState<string>()
  const [middleName, setMiddleName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [husbandLastName, setHusbandLastName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [rePassword, setRePassword] = useState<string>()
  const [selectedPackage, setSelectedPackage] = useState<any>()
  const [packages, setPackages] = useState([
    {
      name: 'Practical Driving Course (PDC)',
      cost: 500,
    },
    {
      name: 'Theoretical Driving Course (TDC) - MT',
      cost: 400,
    },
    {
      name: 'Theoretical Driving Course (TDC) - AT',
      cost: 600,
    },
    {
      name: 'PDC + TDC - MT',
      cost: 700,
    },
    {
      name: 'PDC + TDC - AT',
      cost: 900,
    },
  ])

  const handleRegister = async () => {
    if (password !== rePassword) {
      return alert('Incorrect Password!')
    }

    if (!email || !password || !firstName || !middleName || !lastName || !phone) {
      return alert('Complete All Required Information')
    }
    const studentService = new StudentService()
    const user: TRegister = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      husbandLastName,
      phone,
      selectedPackage,
    }

    const token = await studentService.register(user)
    
    window.location.replace('/profile')
  }

  return (
    <div className="container-fluid bg-slate-200 p-20">
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>First Name</label>
        <Input type="text" placeholder="eg. Julia" callback={setFirstName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Middle Name</label>
        <Input type="text" placeholder="eg. Marquez" callback={setMiddleName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Last Name</label>
        <Input type="text" placeholder="eg. Dela Cruz" callback={setLastName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Husband Last Name</label>
        <Input type="text" placeholder="eg. Mendoza" callback={setHusbandLastName} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Phone</label>
        <Input type="text" callback={setPhone} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Email</label>
        <Input type="email" callback={setEmail} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Password</label>
        <Input type="password" callback={setPassword} />
      </div>
      <div className="inline-block p-4">
        <label htmlFor="" className='block'>Repeat Password</label>
        <Input type="password" callback={setRePassword} />
      </div>
      <div className="block p-4">
        {
          packages?.map(i => (
            <div className="inline-block m-2">
              <Radio name="package" value={i.name + ' P' + i.cost} callback={setSelectedPackage} />
            </div>
          ))
        }
      </div>
      <div className="block mb-4">
        <Button placeholder="Register" callback={handleRegister} />
      </div>
    </div>  
  )
}
