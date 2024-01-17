import { Helmet } from 'react-helmet';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTowerCell } from '@fortawesome/free-solid-svg-icons'

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import styles from "./index.module.css";
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import LocationTab from './LocationTab';
import ParamsTab from './ParamsTab';
import PerformanceTab from './PerformanceTab';
import EquipmentTab from './EquipmentTab';
import PicturesTab from './PicturesTab';

function Tab({title, tabName, selectedTab, onChange:handleTabChange}: {title:string, tabName:string, selectedTab:string, onChange:Function}) {
  return <>
    <input 
      type="radio" 
      id={tabName} 
      name="siteTabs" 
      value={tabName} 
      className="tab" 
      checked={selectedTab===tabName} 
      onChange={() => handleTabChange(tabName)} 
    />
    <label htmlFor={tabName}>{title}</label>
  </>;
}

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

  function handleTabChange(tab:string) {
    setSearchParams({tab});
  }

  let content;
  if (selectedTab === 'equipment') {
    content = <EquipmentTab />;
  } else if (selectedTab === 'performance') {
    content = <PerformanceTab />;
  } else if (selectedTab === 'params') {
    content = <ParamsTab />;
  } else if (selectedTab === 'pictures') {
    content = <PicturesTab />;
  } else {
    content = <LocationTab site={siteState} />;
  }

  return <>
    <Helmet>
      <title>Falcon - {cascadeCode} </title>
    </Helmet>

    <h2 className={styles.cascadeTitle}>
      <FontAwesomeIcon icon={faTowerCell} />
      <span>{cascadeCode}</span>
    </h2>

    {siteState.status === 'loading' && <LoadingSpinner />}

    <div className="tab-wrapper">
      <Tab title="Location"    tabName="location"    selectedTab={selectedTab} onChange={handleTabChange} />
      <Tab title="Equipment"   tabName="equipment"   selectedTab={selectedTab} onChange={handleTabChange} />
      <Tab title="Pictures"    tabName="pictures"    selectedTab={selectedTab} onChange={handleTabChange} />
      <Tab title="Params"      tabName="params"      selectedTab={selectedTab} onChange={handleTabChange} />
      <Tab title="Performance" tabName="performance" selectedTab={selectedTab} onChange={handleTabChange} />

      <div className="tab__content">
        {content}
      </div>  

    </div>
  </>;
}