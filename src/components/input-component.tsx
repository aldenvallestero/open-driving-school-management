import { TInput } from "../commons/type-common";

export default function Input({
  type = "text",
  placeholder = "",
  callback,
  defaultValue = "",
}: TInput) {
  return (
    <input
      type={type}
      className="text-black p-2 w-full rounded-md"
      placeholder={placeholder}
      onChange={(data) => callback(data.target.value)}
      defaultValue={defaultValue}
    />
  );
}
