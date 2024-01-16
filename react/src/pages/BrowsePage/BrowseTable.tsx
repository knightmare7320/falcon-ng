import { kpiRowType } from "../../util/browse.model";
import { getColumnName } from "./lookups";
import BrowseRow from "./BrowseRow";

import "./BrowseTable.css";

export default function BrowseTable({type, rows}: {type:string, rows: kpiRowType[]}) {
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
        {rows.map(row => 
          <BrowseRow key={row.id.toString()} type={type} row={row} />
        )}
      </tbody>
    </table>
  )
}