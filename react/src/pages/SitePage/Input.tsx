export default function Input({label, id, value, ...props}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} value={value || ""} {...props} />
    </>
  )
}