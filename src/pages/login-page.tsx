import Input from '../components/input-component'
import Button from '../components/button-component'
import { useState } from 'react'

export default function LoginPage() {

  const [, setEmail] = useState<string>();
  const [, setPassword] = useState<string>();

  const handleLogin = () => {
    
    window.location.replace('/profile')
  }

  return (
    <div className="container-fluid flex bg-slate-200 justify-center align-middle items-center min-h-screen">
      <div className="shadow-2xl rounded-md p-20">
        <h1 className="font-bold text-3xl mb-4">Login</h1>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Email or Username</label>
          <Input type="text" placeholder="eg. juandelacruz" callback={setEmail} />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Password</label>
          <Input type="password" callback={setPassword} />
        </div>
        <div className="block mb-4">
          <Button placeholder="Login" callback={handleLogin} />
        </div>
      </div>
    </div>
    
  )
}
