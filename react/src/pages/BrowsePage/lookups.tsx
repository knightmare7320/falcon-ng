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

export function getQuery(
  type: string, 
  id: string, 
  pageNumber: number, 
  pageSize: number, 
  fetchBrowsePerfData: Function
) {
  switch(type) {

    case "national": 
      return {
        queryKey: [
          'national', 
          { pageNumber, pageSize }
        ],
        queryFn: 
          ({signal}: {signal: AbortSignal}) => {
            return fetchBrowsePerfData(
              {
                signal, 
                type: 'national', 
                page_number: pageNumber, 
                page_size: pageSize,
              }
            );
          },
      };

    case "region":
      return {
        queryKey: [
          "region", 
          { id, pageNumber, pageSize },
        ],
        queryFn: 
          ({signal}: {signal: AbortSignal}) => {
            return fetchBrowsePerfData(
              {
                signal, 
                id, 
                type:'region', 
                page_number: pageNumber, 
                page_size: pageSize,
              }
            );
          },
      }
  
    case "l4_market":
      return {
        queryKey: [
          "l4_market", 
          { id, pageNumber, pageSize },
        ],
        queryFn: 
          ({signal}: {signal: AbortSignal}) => {
            return fetchBrowsePerfData(
              { 
                signal, 
                id, 
                type:'l4_market', 
                page_number: pageNumber, 
                page_size: pageSize,
              }
            );
          },
      }
  
    case "l5_market":
      return {
        queryKey: [
          "l5_market", 
          { id, pageNumber, pageSize },
        ],
        queryFn: 
          ({signal}: {signal: AbortSignal}) => {
            return fetchBrowsePerfData(
              {
                signal, 
                id, 
                type:'l5_market', 
                page_number: pageNumber, 
                page_size: pageSize,
              }
            );
          },
      }
  
    case "cluster":
      return {
        queryKey: [
          "cluster", 
          { id, pageNumber, pageSize },
        ],
        queryFn: 
          ({signal}: {signal: AbortSignal}) => {
            return fetchBrowsePerfData(
              {
                signal, 
                id, 
                type:'cluster', 
                page_number: pageNumber, 
                page_size: pageSize,
              }
            );
          },
      }

  }
  return {
    queryKey: [],
    queryFn: () => {},
  };
}


export function getLink(type: string, id: number, name: string, description?: string): ReactElement {
  switch(type) {

    case "national": 
      return <Link to={'/browse/region/'+id.toString()}>{name}</Link>;

    case "region":
      return <Link to={'/browse/l4_market/'+id.toString()}>{name}</Link>;

    case "l4_market":
      return <Link to={'/browse/l5_market/'+id.toString()}>{name}</Link>;

    case "l5_market":
      return <Link to={'/browse/cluster/'+id.toString()}>{name}</Link>;

    case "cluster":
      return <Link to={'/site/' + name} title={description}>{name}</Link>;
      
  }

  return <></>;
}