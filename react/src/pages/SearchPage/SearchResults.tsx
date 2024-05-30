import { Link } from "react-router-dom";
import { Site } from "../../util/site.model";

import styles from "./SearchResults.module.css";

export default function SearchResults({searchString, rows}: {searchString: string, rows: Site[]}) {
  if (searchString !== '' && rows.length < 1) {
    return <p>No Results!</p>;
  }

  return <>
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
          <tr key={row.cascade_code}>
            <td><Link to={`/site/${row.cascade_code}`} title={row.cascade_code}>{row.cascade_code}</Link></td>
            <td>{row.site_name}</td>
            <td>{row.address1}</td>
            <td>{row.city}</td>
            <td className="center">{row.state}</td>
          </tr>
        )}
      </tbody>
    </table>
  </>;
}