import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const siteState = useSelector((state: RootState) => state.site);

  const cascadeCode = params.cascade_code || '';

  useEffect(() => {
    if (siteState.status === 'init' || siteState.cascade_code !== cascadeCode) {
      dispatch(siteActions.setCascade(cascadeCode));
    }
  }, [cascadeCode]);

  return <>
    <Helmet>
      <title>Falcon - {cascadeCode} </title>
    </Helmet>

    {siteState.status === 'loading' && <LoadingSpinner />}

    <div className={styles.siteDetailBox}>
      <div className={styles.siteDetailColumn}>
        <SiteDetails site={siteState.site} />
      </div>
      <div className={styles.siteDetailColumn}>
        <InsetMap latitude={siteState.site.latitude} longitude={siteState.site.longitude} />
        <NearestSites data={siteState.nearest} />
      </div>
    </div>
  </>;
}