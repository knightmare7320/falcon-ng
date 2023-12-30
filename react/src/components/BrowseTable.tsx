import { kpiTableType } from "../util/http";
import BrowseRow from "./BrowseRow";

export default function BrowseTable({type, data}: {type:string, data: kpiTableType}) {
  return (
    <table className="browseTable">
      <thead>
        <tr>
          <th>Region</th>
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