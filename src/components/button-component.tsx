import { TButton } from '../commons/type-common'

export default function Button({ placeholder, callback }: TButton) {
  return (
    <button className='bg-white hover:bg-gray-400 rounded-md p-2 w-full' onClick={callback}>{placeholder}</button>
  )
}
