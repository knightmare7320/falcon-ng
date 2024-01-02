import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

import { fetchBrowsePerfData, kpiTableType } from "../util/http";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import BrowseTable from "../components/BrowseTable";

function getTitle(type: string, data: kpiTableType): string {
  if (type === "national") {
    return "National";
  } else if (type === "region") {
    return data.name + " Region";
  } else if (type === "l4_market") {
    return data.name + " L4 Market";
  } else if (type === "l5_market") {
    return data.name + " L5 Market";
  } else if (type === "cluster") {
    return data.name + " Cluster";
  }
  return '';
}

export default function BrowsePage({type}: {type: string}) {
  const params = useParams();
  let id: number = -1;
  if (params.id) {
    id = parseInt(params.id);
  }

  let queryKey: Array<string> = [];
  let queryFn;
  if (type === "national") {
    queryKey = ['national']; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, type: 'national'});
  } else if (type === "region") {
    queryKey = ["region", id.toString()]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'region'});
  } else if (type === "l4_market") {
    queryKey = ["l4_market", id.toString()]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'l4_market'});
  } else if (type === "l5_market") {
    queryKey = ["l5_market", id.toString()]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'l5_market'});
  } else if (type === "cluster") {
    queryKey = ["cluster", id.toString()]; // TODO: include queryparams
    queryFn = ({signal}: {signal: AbortSignal}) => fetchBrowsePerfData({signal, id, type:'cluster'});
  }

  const { data, isPending, isError, error } = useQuery({queryKey, queryFn});

  let content;

  // TODO: push the error into a notification instead
  if (isError) {
    content = <p>ERROR - {error.message}</p>;
  }

  if (data && data.rows) {
    content = <>
      <Helmet>
        <title>Falcon - {getTitle(type, data)}</title>
      </Helmet>

      <h1>{getTitle(type, data)} Performance</h1>
      <BrowseTable type={type} data={data}/>

      {isPending && <LoadingSpinner />}
    </>;
  }

  return content;
}