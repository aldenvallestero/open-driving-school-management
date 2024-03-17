import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/input-component'
import { UserContext } from '../contexts/Context'
import Button from '../components/button-component'
import SchoolService from '../services/school-service'

export default function SchoolRegisterPage() {
  const schoolService = new SchoolService()
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [, setUser] = useContext(UserContext)


  const handleRegister = async () => {
    if (password !== repeatPassword) {
      alert('Password do not match! Please try again.')
      return
    }

    const school = { name, phone, email, password }
    const token = await schoolService.register(school)

    if (token) {
      setUser(token)
      navigate('/admin')
    }
  }

  return (
    <div className="container-fluid flex bg-slate-200 justify-center align-middle items-center min-h-screen">
      <div className="shadow-2xl rounded-md p-20">
        <h1 className="font-bold text-3xl mb-4">School Register</h1>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Name</label>
          <Input type="name" placeholder="eg. A1C Driving School" callback={setName} />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Email</label>
          <Input type="email" placeholder="eg. driving.school@email.com" callback={setEmail} />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Phone</label>
          <Input type="text" placeholder="eg. 09123456789" callback={setPhone} />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Password</label>
          <Input type="password" callback={setPassword} />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Repeat Password</label>
          <Input type="password" callback={setRepeatPassword} />
        </div>
        <div className="block mb-4">
          <Button placeholder="Create an account" callback={handleRegister} />
        </div>
      </div>
    </div>
    
  )
}
