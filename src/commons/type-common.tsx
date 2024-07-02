export type TInput = {
  type?: string;
  placeholder?: string;
  callback: (data: string) => void;
  defaultValue?: string;
};

export type TButton = {
  placeholder: string;
  callback: () => void;
};

export type TRadio = {
  name: string;
  value: string;
  callback: (value: string) => void;
};

export type TRegister = {
  email: string;
  password: string;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  marriageLastName: string | undefined;
  suffix: string | undefined;
  address: string;
  birthday: string;
  gender: string;
  school: string;
  branch: string;
  phone: string;
  course: string;
};

export type TCourse = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type TStudent = {
  id: string;
  name: string;
  gender: string;
  createdAt: string;
};

export type TUser = {
  id?: string;
  admin?: boolean;
} | null;
