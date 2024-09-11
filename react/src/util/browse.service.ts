import { tableRequestType, kpiTableType, GroupType } from "./browse.model";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function fetchBrowsePerfData({ 
  // signal, 
  id = undefined,
  type,
  pageNumber = 1, 
  pageSize= 10, 
  orderBy = 'name', 
  orderDir = 'asc', 
  filterString=''
}: tableRequestType):Promise<kpiTableType> {

  let url = API_URL;
  if (type === "national") {
    url += '/regions/perf?';
  } else if (type === "region") {
    url += '/l4Markets/perf/' + id + '?';
  } else if (type === "l4Market") {
    url += '/l5Markets/perf/' + id + '?';
  } else if (type === "l5Market") {
    url += '/orgClusters/perf/' + id + '?';
  } else if (type === "orgCluster") {
    url += '/sites/perf/?type=orgClusterId&id=' + id + '&';
  }
  let params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    orderBy,
    orderDir,
    filterString,
  };

  const response = await fetch(url + new URLSearchParams(params));

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  return await response.json();
}

export async function fetchGroup(type:string):Promise<GroupType[]> {
  let url = API_URL + '/' + type;
  const response = await fetch(url);
  
  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  return await response.json();
}
