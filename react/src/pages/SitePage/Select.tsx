export default function Input({label, id, items, ...props}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} {...props}>
        <option key={0}></option>
        { items.map(item => 
          <option value={item.id} key={item.id}>{item.name}</option>
        )}
      </select>
    </>
  )
}