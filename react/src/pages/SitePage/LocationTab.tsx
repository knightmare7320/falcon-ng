import styles from "./index.module.css";

import { SiteState } from '../../store/site.slice';

import InsetMap from './InsetMap';
import SiteDetails from './SiteDetails';
import NearestSites from './NearestSites';

export default function LocationTab({site}: {site:SiteState}) {
  return (
    <div className={styles.siteDetailBox}>
      <div className={styles.siteDetailColumn}>
        <SiteDetails site={site.site} />
      </div>
      <div className={styles.siteDetailColumn}>
        <InsetMap latitude={site.site.latitude} longitude={site.site.longitude} />
        <NearestSites data={site.nearest} />
      </div>
    </div>
  );
}