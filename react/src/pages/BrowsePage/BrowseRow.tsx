import { getLink } from "./lookups"
import { kpiRowType } from "../../util/browse.model"

export default function RegionRow({type, row}: {type: string, row: kpiRowType}) {
  return (
    <tr>
      <td>{getLink(type, row.id, row.name, row.description)}</td>
      <td>{row.setup_attempts}</td>
      <td>{row.access_failures}</td>
      <td>{row.equipment_blocks}</td>
      <td>{row.successful_calls}</td>
      <td>{row.primary_drops}</td>
      <td>{row.primary_erlangs}</td>
    </tr>
  );
}