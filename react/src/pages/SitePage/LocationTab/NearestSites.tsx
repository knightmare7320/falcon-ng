import { Link } from "react-router-dom";
import { Nearest } from "../../../util/site.model";

import styles from "./NearestSites.module.css";

type NearestSitesProps = {
  data:Nearest[]
};


function bearingArrow(bearing: string|undefined): React.ReactNode {
  switch (bearing) {
    case 'N': 
      return <>&uarr;</>;
    case 'S':
      return <>&darr;</>;
    case 'E':
      return <>&rarr;</>;
    case 'W':
      return <>&larr;</>;
    case 'NE':
      return <>&#8599;</>;
    case 'SE':
      return <>&#8600;</>;
    case 'SW':
      return <>&#8601;</>;
    case 'NW':
      return <>&#8598;</>;
    
    default:
      return bearing;
  }
}


export default function NearestSites({data}:NearestSitesProps) {
  return <>
    <h3 className={styles.title}>Nearest Sites</h3>
    {data.length === 0 && <p>'None.'</p>}
    <ol className={styles.list}>
      {
        data.map(site => 
          <li key={site.cascadeCode}>
            <Link to={`/site/${site.cascadeCode}`} title={site.siteName}>
              <strong>{site.cascadeCode}</strong> <span>({site.distanceMi}mi {bearingArrow(site.bearing)}) - {site.address}, {site.city} {site.state} </span>
            </Link>
          </li>  
        )
      }
    </ol>
  </>  
}