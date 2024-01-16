import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import styles from "./index.module.css";
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import LocationTab from './LocationTab';
import ParamsTab from './ParamsTab';
import PerformanceTab from './PerformanceTab';
import EquipmentTab from './EquipmentTab';


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

  function handleTabChange(event: any) {
    const tabName = event.currentTarget.value;
    setSearchParams({tab: tabName});
  }

  let content;
  if (selectedTab === 'equipment') {
    content = <EquipmentTab />;
  } else if (selectedTab === 'performance') {
    content = <PerformanceTab />;
  } else if (selectedTab === 'params') {
    content = <ParamsTab />;
  } else {
    content = <LocationTab site={siteState} />;
  }

  return <>
    <Helmet>
      <title>Falcon - {cascadeCode} </title>
    </Helmet>

    <h2>Site - <span>{cascadeCode}</span></h2>
    {siteState.status === 'loading' && <LoadingSpinner />}

    <div className={styles.tab__container}>
      <input type="radio" id="location" name="siteTabs" value="location" className={styles.tab} checked={selectedTab==="location"} onChange={handleTabChange} />
      <label htmlFor="location">Location</label>

      <input type="radio" id="equipment" name="siteTabs" value="equipment" className={styles.tab} checked={selectedTab==="equipment"}  onChange={handleTabChange} />
      <label htmlFor="equipment">Equipment</label>

      <input type="radio" id="params" name="siteTabs" value="params" className={styles.tab} checked={selectedTab==="params"} onChange={handleTabChange} />
      <label htmlFor="params">Params</label>

      <input type="radio" id="performance" name="siteTabs" value="performance" className={styles.tab} checked={selectedTab==="performance"} onChange={handleTabChange} />
      <label htmlFor="performance">Performance</label>


      <div className={styles.tab__content}>

       {content}

      </div>  


    </div>
  </>;
}