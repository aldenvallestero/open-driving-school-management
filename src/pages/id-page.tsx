
import QRCode from 'react-qr-code'
import pic from '../media/pic-media.jpeg'
import { useRef, useState } from 'react'

export default function IdPage() {

  const [name] = useState('Mark Yutuc')
  const [id] = useState('2401001')
  const [url] = useState('google.com')

  return (
    <div className="container-fluid flex text-white text-center justify-center align-middle items-center">
      <div className="block bg-red-800 p-20">
        <h1 className="font-bold text-4xl">A1C Driving School</h1>
        <h1>Tumana, Sta. Maria, 3022, Bulacan</h1>
        <img className="mx-auto my-4" src={pic} alt="" />
        <h1 className="font-bold">{name}</h1>
        <small>{id}</small>
        <div className="h-auto border p-1 w-full rounded-sm m-auto max-w-32 mt-4">
            <QRCode
            size={256}
            className="h-auto max-w-full w-full"
            value={url}
            viewBox={`0 0 256 256`}
            />
        </div>
      </div>
    </div>
    
  )
}
