import { TInput } from "../commons/type-common";

export default function InlineInput({
  type = "text",
  placeholder = "",
  callback,
}: TInput) {
  return (
    <input
      type={type}
      className="inline-block text-black p-2 m-2 rounded-md"
      placeholder={placeholder}
      onChange={(data) => callback(data.target.value)}
    />
  );
}
