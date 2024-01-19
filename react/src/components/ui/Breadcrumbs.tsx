import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({region_id, l4_market_id, l5_market_id, cluster_id, cascade_code}: 
  { region_id?:number,
    l4_market_id?:number,
    l5_market_id?:number,
    cluster_id?:number,
    cascade_code?:string,
  }) {
  const uiState = useSelector((state: RootState) => state.ui);

  let content = [];
  
  if (cascade_code) {
    content.unshift(<>&gt; {cascade_code}</>);
  }
  
  if (cluster_id) {
    const item = uiState.clusters.find(cluster => cluster_id === cluster.id);
    if (item) {
      content.unshift(<> &gt; <Link to={`/browse/cluster/${cluster_id}`}>{item.name}</Link></>);
      l5_market_id = l5_market_id || item.parent_id;
    }
  }
  
  if (l5_market_id) {
    const item = uiState.l5_markets.find(l5_market => l5_market_id === l5_market.id);
    if (item) {
      content.unshift(<> &gt; <Link to={`/browse/l5_market/${l5_market_id}`}>{item.name}</Link></>);
      l4_market_id = l4_market_id || item.parent_id;
    }
  }
  
  if (l4_market_id) {
    const item = uiState.l4_markets.find(l4_market => l4_market_id === l4_market.id);
    if (item) {
      content.unshift(<> &gt; <Link to={`/browse/l4_market/${l4_market_id}`}>{item.name}</Link></>);
      region_id = region_id || item.parent_id;
    }
  }
  
  if (region_id) {
    const item = uiState.regions.find(region => region_id === region.id);
    if (item) {
      content.unshift(<> &gt; <Link to={`/browse/region/${region_id}`}>{item.name}</Link></>);
    }
  }
  
  content.unshift(<Link to="/browse"><FontAwesomeIcon icon={faHome} /></Link>);

  return <div className={styles.breadcrumbs}>
    { content }
  </div>
}