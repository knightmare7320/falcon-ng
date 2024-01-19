import { Helmet } from 'react-helmet';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTowerCell, faLocationDot, faImage, faSliders, faRadio, faChartLine } from '@fortawesome/free-solid-svg-icons'

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import styles from "./index.module.css";

import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Tab from '../../components/ui/Tab';
import LocationTab from './LocationTab';
import ParamsTab from './ParamsTab';
import PerformanceTab from './PerformanceTab';
import EquipmentTab from './EquipmentTab';
import PicturesTab from './PicturesTab';


export default function SitePage() {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const siteState = useSelector((state: RootState) => state.site);

  
  const cascadeCode = params.cascade_code || '';
  useEffect(() => {
    if (siteState.status === 'init' || siteState.cascade_code !== cascadeCode) {
      dispatch(siteActions.setCascade(cascadeCode));
    }
  }, [cascadeCode]);

  
  let [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('tab') || 'location';
  let tabContent = <></>;
  switch(selectedTab) {
    case 'location':
      tabContent = <LocationTab site={siteState.site} nearestSites={siteState.nearest} />;
      break;
    case 'equipment': 
    tabContent = <EquipmentTab btss={siteState.btss} sectors={siteState.sectors} carriers={siteState.carriers} />;
      break;
    case 'performance':
      tabContent = <PerformanceTab btss={siteState.btss} sectors={siteState.sectors} carriers={siteState.carriers} />;
      break;
    case 'params':
      tabContent = <ParamsTab btss={siteState.btss} sectors={siteState.sectors} carriers={siteState.carriers} />;
      break
    case 'pictures':
      tabContent = <PicturesTab />;
  }


  function handleTabChange(tabName:string) {
    if (tabName === 'location') {
      navigate('.')
    } else {
      setSearchParams({tab: tabName});
    }
  }

  return <>
    <Helmet>
      <title>Falcon - {cascadeCode} </title>
    </Helmet>

    {siteState.status === 'loading' && <LoadingSpinner />}

    <main className="main-content">
      <h2 className={styles.cascadeTitle}>
        <FontAwesomeIcon icon={faTowerCell} />
        <span>{cascadeCode}</span>
      </h2>

      <div className="tab-wrapper">
        <Tab title="Location"    faIcon={faLocationDot} tabName="location"    selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Equipment"   faIcon={faRadio}       tabName="equipment"   selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Pictures"    faIcon={faImage}       tabName="pictures"    selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Params"      faIcon={faSliders}     tabName="params"      selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Performance" faIcon={faChartLine}   tabName="performance" selectedTab={selectedTab} onChange={handleTabChange} />

        <div className="tab__content">
          {tabContent}
        </div>  

      </div>
    </main>
  </>;
}