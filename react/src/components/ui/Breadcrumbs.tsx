import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({regionId, l4MarketId, l5MarketId, orgClusterId, cascadeCode}: 
  { regionId?:number,
    l4MarketId?:number,
    l5MarketId?:number,
    orgClusterId?:number,
    cascadeCode?:string,
  }) {
  const uiState = useSelector((state: RootState) => state.ui);

  let content = [];
  
  if (cascadeCode) {
    content.unshift(<li key={"breadcrumb-x"}><FontAwesomeIcon icon={faCaretRight} /> {cascadeCode}</li>);
  }
  
  if (orgClusterId) {
    const item = uiState.orgClusters.find(orgCluster => orgClusterId === orgCluster.id);
    if (item) {
      if (cascadeCode) {
        content.unshift(<li key={"breadcrumb-0"}> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/orgCluster/${orgClusterId}`}>{item.name}</Link></li>);
      } else {
        content.unshift(<li key={"breadcrumb-0"}> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </li>);
      }
      l5MarketId = l5MarketId || item.parentId;
    }
  }
  
  if (l5MarketId) {
    const item = uiState.l5Markets.find(l5Market => l5MarketId === l5Market.id);
    if (item) {
      if (orgClusterId) {
        content.unshift(<li key={"breadcrumb-1"}> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/l5Market/${l5MarketId}`}>{item.name}</Link></li>);
      } else {
        content.unshift(<li key={"breadcrumb-1"}> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </li>);
      }
      l4MarketId = l4MarketId || item.parentId;
    }
  }
  
  if (l4MarketId) {
    const item = uiState.l4Markets.find(l4Market => l4MarketId === l4Market.id);
    if (item) {
      if (l5MarketId) {
        content.unshift(<li key={"breadcrumb-2"}> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/l4Market/${l4MarketId}`}>{item.name}</Link></li>);
      } else {
        content.unshift(<li key={"breadcrumb-2"}> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </li>);
      }
      regionId = regionId || item.parentId;
    }
  }
  
  if (regionId) {
    const item = uiState.regions.find(region => regionId === region.id);
    if (item) {
      if (l4MarketId) {
        content.unshift(<li key={"breadcrumb-3"}> <FontAwesomeIcon icon={faCaretRight} /> <Link to={`/browse/region/${regionId}`}>{item.name}</Link></li>);
      } else {
        content.unshift(<li key={"breadcrumb-3"}> <FontAwesomeIcon icon={faCaretRight} /> {item.name} </li>);
      }
    }
  }
  
  if (regionId) {
    content.unshift(<li key={"breadcrumb-4"}><Link to="/browse"><FontAwesomeIcon icon={faHome} /></Link></li>);
  } else {
    content.unshift(<li key={"breadcrumb-4"}><FontAwesomeIcon  key={"breadcrumb-4"} icon={faHome} /></li>);
  }

  return <div className={styles.breadcrumbs}>
    <ol>{ content }</ol>
  </div>
}