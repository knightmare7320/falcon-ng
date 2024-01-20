import { Link } from "react-router-dom";
import { Nearest } from "../../../util/site.model";

import styles from "./NearestSites.module.css";

export default function NearestSites({data}: {data:Nearest[]}) {
  return <>
    <h3 className={styles.title}>Nearest Sites</h3>
    {data.length === 0 && <p>'None.'</p>}
    <ol className={styles.list}>
      {
        data.map(site => 
          <li key={site.cascade_code}>
            <Link to={`/site/${site.cascade_code}`} title={site.site_name}>
              <strong>{site.cascade_code}</strong> <span>({site.distance_mi}mi {site.bearing}) - {site.address1}, {site.city} {site.state} </span>
            </Link>
          </li>  
        )
      }
    </ol>
  </>  
}