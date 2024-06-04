import { ChangeEventHandler } from "react";

export default function Input(
  {label, id, value, onChange, ...props}: 
  {label:string, id:string, value?:number|string, onChange: ChangeEventHandler<HTMLInputElement>}
) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} value={value || ""} onChange={onChange} {...props} />
    </>
  )
}