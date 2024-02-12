import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCaretRight } from "@fortawesome/free-solid-svg-icons";

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
    content.unshift(<><FontAwesomeIcon icon={faCaretRight} key={"breadcrumb-x"} /> {cascade_code}</>);
  }
  
  if (cluster_id) {
    const item = uiState.clusters.find(cluster => cluster_id === cluster.id);
    if (item) {
      if (cascade_code) {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/cluster/${cluster_id}`} key={"breadcrumb-0"}>{item.name}</Link></>);
      } else {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </>);
      }
      l5_market_id = l5_market_id || item.parent_id;
    }
  }
  
  if (l5_market_id) {
    const item = uiState.l5_markets.find(l5_market => l5_market_id === l5_market.id);
    if (item) {
      if (cluster_id) {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/l5_market/${l5_market_id}`} key={"breadcrumb-1"}>{item.name}</Link></>);
      } else {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </>);
      }
      l4_market_id = l4_market_id || item.parent_id;
    }
  }
  
  if (l4_market_id) {
    const item = uiState.l4_markets.find(l4_market => l4_market_id === l4_market.id);
    if (item) {
      if (l5_market_id) {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/l4_market/${l4_market_id}`} key={"breadcrumb-2"}>{item.name}</Link></>);
      } else {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </>);
      }
      region_id = region_id || item.parent_id;
    }
  }
  
  if (region_id) {
    const item = uiState.regions.find(region => region_id === region.id);
    if (item) {
      if (l4_market_id) {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/region/${region_id}`} key={"breadcrumb-3"}>{item.name}</Link></>);
      } else {
        content.unshift(<> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </>);
      }
    }
  }
  
  if (region_id) {
    content.unshift(<Link to="/browse" key={"breadcrumb-4"}><FontAwesomeIcon icon={faHome} /></Link>);
  } else {
    content.unshift(<FontAwesomeIcon icon={faHome} />);
  }

  return <div className={styles.breadcrumbs}>
    { content }
  </div>
}