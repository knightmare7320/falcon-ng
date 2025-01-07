import { getLink } from "./lookups"
import { kpiRowType } from "../../util/browse.model"

export default function RegionRow({type, row}: {type: string, row: kpiRowType}) {
  return (
    <tr>
      <td>{getLink(type, row.id, row.name, row.description)}</td>
      <td>{row.setupAttempts}</td>
      <td>{row.accessFailures}</td>
      <td>{row.equipmentBlocks}</td>
      <td>{row.successfulCalls}</td>
      <td>{row.primaryDrops}</td>
      <td>{row.primaryErlangs}</td>
    </tr>
  );
}