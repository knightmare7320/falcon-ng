import { ChangeEventHandler } from "react";
import styles from "./Select.module.css";

export default function Select(
  {label, id, value, items, onChange, ...props}: 
  {label:string, id:string, value?:number, items:{id:number, name:string}[], onChange: ChangeEventHandler<HTMLSelectElement>}
) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} onChange={onChange} {...props}>
        <option key={0}></option>
        { items.map(item => 
          <option value={item.id} key={item.id}>{item.name}</option>
        )}
      </select>
    </>
  )
}