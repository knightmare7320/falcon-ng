import styles from "./index.module.css";
import "./index.css";

import { SiteState } from '../../../store/site.slice';

import InsetMap from './InsetMap';
import SiteDetails from './SiteDetails';
import NearestSites from './NearestSites';

type LocationTabProps = {
  site:SiteState['site'], 
  nearestSites:SiteState['nearest'],
  authState:string,
};


export default function LocationTab({site, nearestSites, authState}:LocationTabProps) {
  return <>
    {site.latitude && site.longitude &&
      <div className={styles.siteDetailBox}>
        <div className={styles.siteDetailColumn}>
          <SiteDetails site={site} authState={authState} />
        </div>
        <div className={styles.siteDetailColumn}>
          <InsetMap latitude={site.latitude} longitude={site.longitude} />
          <NearestSites data={nearestSites} />
        </div>
      </div>
    }
  </>;
}