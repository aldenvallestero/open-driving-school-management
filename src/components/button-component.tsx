import { TButton } from '../commons/type-common'

export default function Button({ placeholder }: TButton) {
  return (
    <button className='bg-white text-red-800 rounded-md p-1 w-28'>{placeholder}</button>
  )
}
