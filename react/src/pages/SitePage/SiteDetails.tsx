import { Link } from 'react-router-dom';

import { Site } from '../../util/site.model';

import styles from './SiteDetails.module.css';

export default function SiteDetails({site}:{site:Site}) {
  return <>
    <table className={styles.siteTable}>
      <tbody>
        <tr>
          <th>Cascade:</th>
          <td className={styles.cascadeCode}>{ site.cascade_code }</td>
        </tr>
        <tr>
          <th>Site Name:</th>
          <td>{ site.site_name }</td>
        </tr>
        <tr>
          <th>Site Type:</th>
          <td>{ site.site_type_name }</td>
        </tr>
        <tr>
          <th>Address:</th>
          <td>
            <address>
              { site.address1 } <br/>
              { site.city }, { site.state }  { site.zip_code }
            </address>
          </td>
        </tr>
        <tr>
          <th>County:</th>
          <td>{ site?.county }</td>
        </tr>
        <tr>
          <th>Latitude:</th>
          <td>{ site?.latitude }&deg; N</td>
        </tr>
        <tr>
          <th>Longitude:</th>
          <td>{ site?.longitude }&deg; E</td>
        </tr>
        <tr>
          <th>Elevation:</th>
          <td>{ site?.elevation_feet } ft</td>
        </tr>
        <tr>
          <th>Structure Type:</th>
          <td>{ site?.structure_type_name }</td>
        </tr>
        <tr>
          <th>Repair Priority:</th>
          <td>{ site?.repair_priority_name }</td>
        </tr>
        <tr>
          <th>Timezone:</th>
          <td>{ site?.timezone_name }</td>
        </tr>
        <tr>
          <th>Region:</th>
          <td><Link to={`/browse/region/${site.region_id}`} >{ site?.region_name }</Link></td>
        </tr>
        <tr>
          <th>L4 Market:</th>
          <td><Link to={`/browse/l4_market/${site.l4_market_id}`} >{ site?.l4_market_name }</Link></td>
        </tr>
        <tr>
          <th>L5 Market:</th>
          <td><Link to={`/browse/l5_market/${site.l5_market_id}`} >{ site?.l5_market_name }</Link></td>
        </tr>
        <tr>
          <th>Org Cluster:</th>
          <td><Link to={`/browse/cluster/${site.org_cluster_id}`} >{ site?.org_cluster_name }</Link></td>
        </tr>
        <tr className={styles.edits}>
          <th>Created by:</th>
          <td>{ site?.created_by_name } on { site?.create_date }</td>
        </tr>
        <tr className={styles.edits}>
          <th>Modified by:</th>
          <td>{ site?.modified_by_name } on { site?.modified_date }</td>
        </tr>
      </tbody>
    </table>
  </>;
}