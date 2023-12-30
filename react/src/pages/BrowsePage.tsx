import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBrowsePerfData, kpiTableType } from "../util/http";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import BrowseTable from "../components/BrowseTable";

function getTitle(type: string, data: kpiTableType): string {
  if (type === "national") {
    return "National Performance";
  } else if (type === "region") {
    return data.name + " Region Performance";
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
  }

  const { data, isPending, isError, error } = useQuery({queryKey, queryFn});

  let content;

  // TODO: push the error into a notification instead
  if (isError) {
    content = <p>ERROR - {error.message}</p>;
  }

  if (data && data.rows) {
    content = <>
      <h1>{getTitle(type, data)}</h1>
      <BrowseTable type={type} data={data}/>

      {isPending && <LoadingSpinner />}
    </>;
  }

  return content;
}