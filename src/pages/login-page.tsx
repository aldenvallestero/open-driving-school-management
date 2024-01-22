import Input from '../components/input-component'
import Button from '../components/button-component'

export default function LoginPage() {
  return (
    <div className="container-fluid flex text-white justify-center align-middle">
      <div className="block bg-red-800 p-20">
        <div className="block mb-4">
          <label htmlFor="" className='block'>Email or Username</label>
          <Input type="text" placeholder="eg. juandelacruz" />
        </div>
        <div className="block mb-4">
          <label htmlFor="" className='block'>Password</label>
          <Input type="password" />
        </div>
        <div className="block mb-4">
          <Button placeholder="Login" />
        </div>
      </div>
    </div>
    
  )
}
