export type TInput = {
  type?: string
  placeholder?: string
  callback: (data: string) => void
}

export type TButton = {
  placeholder: string
  callback: () => void
}

export type TRadio = {
  name: string
  value: string
  callback: (value: string) => void
}

export type TRegister = {
  email: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  husbandLastName: string | undefined
  phone: string
  selectedPackage: {
    name: string
    cost: number
  }
}

export type TCourse = {
  id: string
  name: string
  description: string
  price: number
}

export type TStudent = {
  id: string
  name: string
  gender: string
  createdAt: string
}

export type TUser = {
  id?: string
  admin?: boolean
} | null