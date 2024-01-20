import styles from "./index.module.css";

import { SiteState } from '../../../store/site.slice';

import InsetMap from './InsetMap';
import SiteDetails from './SiteDetails';
import NearestSites from './NearestSites';

export default function LocationTab({site, nearestSites}: {site:SiteState['site'], nearestSites:SiteState['nearest']}) {
  return <>
    {site.latitude && site.longitude &&
      <div className={styles.siteDetailBox}>
        <div className={styles.siteDetailColumn}>
          <SiteDetails site={site} />
        </div>
        <div className={styles.siteDetailColumn}>
          <InsetMap latitude={site.latitude} longitude={site.longitude} />
          <NearestSites data={nearestSites} />
        </div>
      </div>
    }
  </>;
}