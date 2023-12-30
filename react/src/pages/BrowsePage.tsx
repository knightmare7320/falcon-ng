import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchPerfRegions } from "../util/http";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import RegionTable from "../components/RegionTable";

export default function BrowsePage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['regions'], // TODO: include queryparams
    queryFn: ({signal}) => fetchPerfRegions({signal})
  });

  let content;

  // TODO: push the error into a notification instead
  if (isError) {
    content = <p>ERROR - {error.message}</p>;
  }

  if (data && data.rows) {
    content = <>
      <h1>Browse</h1>
      <RegionTable data={data}/>

      {isPending && <LoadingSpinner />}
    </>;
  }

  return content;
}