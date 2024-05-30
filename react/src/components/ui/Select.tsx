import styles from "./Select.module.css";

export default function Input({label, id, value, items, ...props}: {label:string, id:string, value?:number, items:{id:number, name:string}[], props:{}}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} value={value} {...props}>
        <option key={0}></option>
        { items.map(item => 
          <option value={item.id} key={item.id}>{item.name}</option>
        )}
      </select>
    </>
  )
}