import { ChangeEventHandler } from "react";

export default function Input(
  {label, id, value, onChange, autoFocus, ...props}: 
  {label:string, id:string, value?:number|string, autoFocus?: boolean, onChange: ChangeEventHandler<HTMLInputElement>}
) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} value={value || ""} autoFocus={autoFocus} onChange={onChange} {...props} />
    </>
  )
}