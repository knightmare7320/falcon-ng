export default function Tab({title, tabName, selectedTab, onChange:handleTabChange}: {title:string, tabName:string, selectedTab:string, onChange:Function}) {
  return <>
    <input 
      type="radio" 
      id={tabName} 
      name="siteTabs" 
      value={tabName} 
      className="tab" 
      checked={selectedTab===tabName} 
      onChange={() => handleTabChange(tabName)} 
    />
    <label htmlFor={tabName}>{title}</label>
  </>;
}