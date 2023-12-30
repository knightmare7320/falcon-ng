import { regionKpiRowType } from "../util/http";
import RegionRow from "./RegionRow";

export default function RegionTable({data}: {data: {rows: regionKpiRowType[]}}) {
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
          <RegionRow row={row} />
        )}
      </tbody>
    </table>
  )
}