import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import styles from "./index.module.css";
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import InsetMap from './InsetMap';
import SiteDetails from './SiteDetails';
import NearestSites from './NearestSites';


export default function SitePage() {
  const params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const siteState = useSelector((state: RootState) => state.site);

  const cascadeCode = params.cascade_code || '';
  const selectedTab = searchParams.get('tab') || 'location';

  useEffect(() => {
    if (siteState.status === 'init' || siteState.cascade_code !== cascadeCode) {
      dispatch(siteActions.setCascade(cascadeCode));
    }
  }, [cascadeCode]);

  function handleTabChange(event) {
    console.log(event);
  }

  return <>
    <Helmet>
      <title>Falcon - {cascadeCode} </title>
    </Helmet>

    <h2>Site - <span>{cascadeCode}</span></h2>
    {siteState.status === 'loading' && <LoadingSpinner />}

    <div className={styles.tabBar}>
      <input type="radio" id="location" name="tabGroup" className={styles.tab} checked={selectedTab==="location"} onChange={handleTabChange}/>
      <label htmlFor="location">Location</label>

      <input type="radio" id="equipment" name="tabGroup" className={styles.tab} checked={selectedTab==="equipment"}  />
      <label htmlFor="equipment">Medium</label>

      <input type="radio" id="params" name="tabGroup" className={styles.tab} checked={selectedTab==="params"} />
      <label htmlFor="params">Params</label>

      <input type="radio" id="performance" name="tabGroup" className={styles.tab} checked={selectedTab==="performance"} />
      <label htmlFor="performance">Performance</label>


      <div className={styles.tab__content}>

        <div className={styles.siteDetailBox}>
          <div className={styles.siteDetailColumn}>
            <SiteDetails site={siteState.site} />
          </div>
          <div className={styles.siteDetailColumn}>
            <InsetMap latitude={siteState.site.latitude} longitude={siteState.site.longitude} />
            <NearestSites data={siteState.nearest} />
          </div>
        </div>

      </div>  



    </div>
  </>;
}