import { TInput } from '../commons/type-common'

export default function Input({ type, placeholder="" }: TInput) {
  return (
    <input
      type={type}
      className="text-black p-1 rounded-md"
      placeholder={placeholder}
    />
  )
}
