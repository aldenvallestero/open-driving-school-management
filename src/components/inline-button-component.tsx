import { TButton } from "../commons/type-common";

export default function InlineButton({ placeholder, callback }: TButton) {
  return (
    <button
      className="inline-block bg-white hover:bg-gray-400 rounded-md p-2 m-2"
      onClick={callback}
    >
      {placeholder}
    </button>
  );
}
