import { TRadio } from "../commons/type-common";

export default function Radio({ name, value, callback }: TRadio) {
  return (
    <>
      <input
        type="radio"
        className=" me-2"
        id={value}
        name={name}
        value={value}
        onClick={() => callback(value)}
      />
      <label htmlFor={value}>{value}</label>
    </>
  );
}
