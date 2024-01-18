import { SiteState } from "../../../store/site.slice";
import { Bts } from "../../../util/site.model";

export default function BtsRows({bts, sectors, carriers}: {bts:SiteState['bts'], sectors:SiteState['sectors'], carriers:SiteState['carriers']}) {
  return <>
    <tr>
      <th>Switch</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.switch_name}</td>) }
    </tr>
    <tr>
      <th>Switch CLLI Code</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.clli_code}</td>) }
    </tr>
    <tr>
      <th>BSC</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.bsc_name}</td>) }
    </tr>
    <tr>
      <th>BTS</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.bts_number}</td>) }
    </tr>
    <tr>
      <th>Vendor</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.equipment_vendor_name}</td>) }
    </tr>
    <tr>
      <th>Bts Type</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.bts_type_name}</td>) }
    </tr>
    <tr>
      <th>Status</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.equipment_status_name}</td>) }
    </tr>
    <tr>
      <th>On-Air Date</th>
      { bts.map((item:Bts) => <td key={item.bts_id}>{item.on_air_date}</td>) }
    </tr>
  </>;
}