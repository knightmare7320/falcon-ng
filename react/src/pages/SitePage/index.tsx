import { useParams, useNavigate } from 'react-router-dom';
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
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import EditSiteDialog from './EditSite';

export default function SitePage() {
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const siteState = useSelector((state:RootState) => state.site);
  const authState = useSelector((state:RootState) => state.auth.status);

  
  const cascadeCode = params.cascadeCode || '';
  useEffect(() => {
    if (siteState.status === 'init' || siteState.cascade_code !== cascadeCode) {
      dispatch(siteActions.setCascade(cascadeCode));
    }
  }, [cascadeCode]);

  const selectedTab = params.tabName || 'location';
  let tabContent = <></>;
  switch(selectedTab) {
    case 'location':
      tabContent = <LocationTab site={siteState.site} nearestSites={siteState.nearest} authState={authState} />;
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
      tabContent = <PicturesTab cascadeCode={cascadeCode} pictures={siteState.pictures}/>;
  }


  function handleTabChange(tabName:string) {
    if (tabName === 'location') {
      navigate(`/site/${cascadeCode}`);
    } else {
      navigate(`/site/${cascadeCode}/${tabName}`);
    }
  }

  return <>
    {siteState.status === 'loading' && <LoadingSpinner />}

    <Breadcrumbs 
      regionId={siteState.site.regionId} 
      l4MarketId={siteState.site.l4MarketId}
      l5MarketId={siteState.site.l5MarketId}
      orgClusterId={siteState.site.orgClusterId}
      cascadeCode={siteState.site.cascadeCode}
    />

    <title>{"Falcon - " + cascadeCode}</title>
    
    <main className="main-content">
      <h2 className={styles.cascadeTitle}>
        <FontAwesomeIcon icon={faTowerCell} />
        <span>{cascadeCode}</span>
      </h2>

      <div className="tab-wrapper">
        <Tab title="Location"    faIcon={faLocationDot} tabName="location"    selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Equipment"   faIcon={faRadio}       tabName="equipment"   selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Performance" faIcon={faChartLine}   tabName="performance" selectedTab={selectedTab} onChange={handleTabChange} />
        <Tab title="Pictures"    faIcon={faImage}       tabName="pictures"    selectedTab={selectedTab} onChange={handleTabChange} />

        <div className="tab__content">
          {tabContent}
        </div>  
      </div>

      <EditSiteDialog openFg={siteState.editSiteOpenFg} />
    </main>
  </>;
}