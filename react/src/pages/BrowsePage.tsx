import { useQuery } from "@tanstack/react-query";
import { queryClient, fetchPerfRegions } from "../util/http";

import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function BrowsePage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['regions'], // TODO: include queryparams
    queryFn: ({signal}) => fetchPerfRegions({signal})
  });

  let content;

  if (isPending) {
    content = <LoadingSpinner />;
  }
  if (isError) {
    content = <p>error</p>;
  }

  if (data && data.rows) {
    console.log(data);
    content = <>
      <h1>Browse</h1>
      <table>

      {data.rows.map(item => <tr><td>{item.region_name}</td></tr>)}
      </table>
    </>;
  }

  return content;
}