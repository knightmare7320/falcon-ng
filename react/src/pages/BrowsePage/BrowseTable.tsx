import { kpiTableType } from "../../util/http";
import BrowseRow from "./BrowseRow";

function getColumnName(type: string): string {
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

export default function BrowseTable({type, data}: {type:string, data: kpiTableType}) {
  return (
    <table className="browseTable">
      <thead>
        <tr>
          <th>{getColumnName(type)}</th>
          <th>Setup Attempts</th>
          <th>Access Failures</th>
          <th>Equipment Blocks</th>
          <th>Successful Calls</th>
          <th>Primary Drops</th>
          <th>Primary Erlangs</th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map(row => 
          <BrowseRow key={row.id.toString()} type={type} row={row} />
        )}
      </tbody>
    </table>
  )
}