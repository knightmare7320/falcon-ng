import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

import styles from './index.module.css';

export default function SitePage() {
  const params = useParams();
  const dispatch = useDispatch();
  const siteState = useSelector((state: RootState) => state.site);

  const cascadeCode = params.cascade_code || '';

  useEffect(() => {
    if (siteState.status === 'init' || siteState.cascade_code !== cascadeCode) {
      dispatch(siteActions.setCascade(cascadeCode));
    }
  });

  return (
    <>
      {siteState.status === 'loading' && <LoadingSpinner />}
      <Helmet>
        <title>Falcon - {cascadeCode} </title>
      </Helmet>
      <table className={styles.siteTable}>
        <tbody>
          <tr>
            <th>Cascade:</th>
            <td className={styles.cascadeCode}>{ siteState.site.cascade_code }</td>
          </tr>
          <tr>
            <th>Site Name:</th>
            <td>{ siteState.site.site_name }</td>
          </tr>
          <tr>
            <th>Site Type:</th>
            <td>{ siteState.site.site_type_name }</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>
              <address>
                { siteState.site.address1 } <br/>
                { siteState.site.address2 } <br/>
                { siteState.site.city }, { siteState.site.state }  { siteState.site.zip_code }
              </address>
            </td>
          </tr>
          <tr>
            <th>County:</th>
            <td>{ siteState.site?.county }</td>
          </tr>
          <tr>
            <th>Latitude:</th>
            <td>{ siteState.site?.latitude }</td>
          </tr>
          <tr>
            <th>Longitude:</th>
            <td>{ siteState.site?.longitude }</td>
          </tr>
          <tr>
            <th>Elevation (ft):</th>
            <td>{ siteState.site?.elevation_feet }</td>
          </tr>
          <tr>
            <th>Structure Type:</th>
            <td>{ siteState.site?.structure_type_name }</td>
          </tr>
          <tr>
            <th>Repair Priority:</th>
            <td>{ siteState.site?.repair_priority_name }</td>
          </tr>
          <tr>
            <th>Timezone:</th>
            <td>{ siteState.site?.timezone_name }</td>
          </tr>
          <tr>
            <th>Region:</th>
            <td><Link to={`/browse/region/${siteState.site.region_id}`} >{ siteState.site?.region_name }</Link></td>
          </tr>
          <tr>
            <th>99 Market:</th>
            <td><Link to={`/browse/99market/${siteState.site.market99_id}`} >{ siteState.site?.market99_name }</Link></td>
          </tr>
          <tr>
            <th>L4 Market:</th>
            <td><Link to={`/browse/l4_market/${siteState.site.l4_market_id}`} >{ siteState.site?.l4_market_name }</Link></td>
          </tr>
          <tr>
            <th>L5 Market:</th>
            <td><Link to={`/browse/l5_market/${siteState.site.l5_market_id}`} >{ siteState.site?.l5_market_name }</Link></td>
          </tr>
          <tr>
            <th>Org Cluster:</th>
            <td><Link to={`/browse/cluster/${siteState.site.org_cluster_id}`} >{ siteState.site?.org_cluster_name }</Link></td>
          </tr>
          <tr>
            <th>MTA:</th>
            <td><Link to={`/browse/mta/${siteState.site.mta_id}`} >{ siteState.site?.mta_name }</Link></td>
          </tr>
          <tr>
            <th>BTA:</th>
            <td><Link to={`/browse/bta/${siteState.site.bta_id}`} >{ siteState.site?.bta_name }</Link></td>
          </tr>
          <tr className={styles.edits}>
            <th>Created by:</th>
            <td>{ siteState.site?.created_by_name } on { siteState.site?.create_date }</td>
          </tr>
          <tr className={styles.edits}>
            <th>Modified by:</th>
            <td>{ siteState.site?.modified_by_name } on { siteState.site?.modified_date }</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}