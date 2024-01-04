import { tableRequestType, kpiTableType } from "./browse.model";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export async function fetchBrowsePerfData({ 
  // signal, 
  id = null,
  type,
  page_number = 1, 
  page_size= 10, 
  order_by = 'name', 
  order_dir = 'asc', 
  filter_string=''
}: tableRequestType): Promise<kpiTableType> {

  let url = API_URL;
  if (type === "national") {
    url += '/regions/perf?';
  } else if (type === "region") {
    url += '/l4_markets/perf/' + id + '?';
  } else if (type === "l4_market") {
    url += '/l5_markets/perf/' + id + '?';
  } else if (type === "l5_market") {
    url += '/clusters/perf/' + id + '?';
  } else if (type === "cluster") {
    url += '/sites/perf/?type=org_cluster_id&id=' + id + '&';
  }
  let params = {
    page_number: page_number.toString(),
    page_size: page_size.toString(),
    order_by,
    order_dir,
    filter_string,
  };

  const response = await fetch(url + new URLSearchParams(params));

  if (!response.ok) {
    const info = await response.json();
    const error = new Error(info?.message || 'There has been an error.');
    throw error;
  }

  return await response.json();
}
