import { Link } from "react-router-dom";
import { Nearest } from "../../util/site.model";

import styles from "./NearestSites.module.css";

export default function NearestSites({data}: {data:Nearest[]}) {
  return <>
    <h3 className={styles.title}>Nearest Sites</h3>
    <ol className={styles.list}>
      {
        data.map(site => 
          <li key={site.cascade_code}>
            <Link to={`/site/${site.cascade_code}`} title={site.site_name}>
              {site.cascade_code} - {site.address1}, {site.city} {site.state} ({site.distance_mi}mi {site.bearing})
            </Link>
          </li>  
        )
      }
    </ol>
  </>  
}