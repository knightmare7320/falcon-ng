import { Link } from "react-router-dom"
import { regionKpiRowType } from "../util/http"

export default function RegionRow({row}: {row: regionKpiRowType}) {
  return (
    <tr>
      <td><Link to={`/browse/region/${row.region_id}`}>{row.region_name}</Link></td>
      <td>{row.setup_attempts}</td>
      <td>{row.access_failures}</td>
      <td>{row.equipment_blocks}</td>
      <td>{row.successful_calls}</td>
      <td>{row.primary_drops}</td>
      <td>{row.primary_erlangs}</td>
    </tr>
  )
}