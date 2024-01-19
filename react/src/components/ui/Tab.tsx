import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import "./Tab.css";

export default function Tab(
  {title, tabName, selectedTab, faIcon, onChange:handleTabChange}: 
  {title:string, tabName:string, selectedTab:string, faIcon?:IconDefinition, onChange:Function}) {
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
    <label htmlFor={tabName} className="tab-label">
      {
        faIcon && 
        <FontAwesomeIcon 
          icon={faIcon} 
          className="tab-label__icon" 
        />
      }
      {title}
    </label>
  </>;
}