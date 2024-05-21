import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function getTitle(type: string, name: string) {
  switch(type) {

    case "national": 
      return "National";

    case "region":
      return name + " Region";

    case "l4_market":
      return name + " L4 Market";

    case "l5_market":
      return name + " L5 Market";

    case "cluster":
      return name + " Cluster";
      
  }
  return '';
}

export function getColumnName(type: string): string {
  if (type === 'national') {
    return 'Region';
  } else if (type === 'region') {
    return 'L4 Market';
  } else if (type === 'l4_market') {
    return 'L5 Market';
  } else if (type === 'l5_market') {
    return 'Cluster';
  } else if (type === 'cluster') {
    return 'Cascade';
  }
  return '';
}


export function getLink(type: string, id: string|number|null, name: string, description?: string): ReactElement {
  switch(type) {

    case "national": 
      return <Link to={`/browse/region/${id}`}>{name}</Link>;

    case "region":
      return <Link to={`/browse/l4_market/${id}`}>{name}</Link>;

    case "l4_market":
      return <Link to={`/browse/l5_market/${id}`}>{name}</Link>;

    case "l5_market":
      return <Link to={`/browse/cluster/${id}`}>{name}</Link>;

    case "cluster":
      return <Link to={`/site/${name}`} title={description}>{name}</Link>;
      
  }

  return <></>;
}