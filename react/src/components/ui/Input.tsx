export default function Input({label, id, value, ...props}: {label:string, id:string, value?:number|string, props:{}}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} value={value || ""} {...props} />
    </>
  )
}