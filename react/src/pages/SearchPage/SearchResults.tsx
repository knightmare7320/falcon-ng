import { Link } from "react-router-dom";
import { Site } from "../../util/site.model";

import styles from "./SearchResults.module.css";

export default function SearchResults({rows}: {rows: Site[]}) {
  return <>{rows.length > 0 &&
    <table className={styles.browseTable}>
      <thead>
        <tr>
          <th>Cascade</th>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => 
          <tr key={row.cascadeCode}>
            <td><Link to={`/site/${row.cascadeCode}`} title={row.cascadeCode}>{row.cascadeCode}</Link></td>
            <td>{row.siteName}</td>
            <td>{row.address}</td>
            <td>{row.city}</td>
            <td className="center">{row.state}</td>
          </tr>
        )}
      </tbody>
    </table>
  }</>;
}