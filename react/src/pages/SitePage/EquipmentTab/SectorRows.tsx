import { SiteState } from "../../../store/site.slice";
import { Sector } from "../../../util/site.model";

export default function SectorRows({sectors}: {sectors?:SiteState['sectors']}) {
  if (!sectors) return <></>;

  return <>
    <tr>
      <th>Sector</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.sector_number}</td>) }
    </tr>
    <tr>
      <th>Azimuth</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.azimuth}</td>) }
    </tr>
    <tr>
      <th>Antenna Height</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.height_agl}</td>) }
    </tr>
    <tr>
      <th>Mechanical Tilt</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.mechanical_tilt}</td>) }
    </tr>
    <tr>
      <th>Antenna Vendor</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.antenna_vendor_name}</td>) }
    </tr>
    <tr>
      <th>Antenna Model</th>
      { sectors.map((item:Sector) => <td key={item.sector_id}>{item.antenna_name}</td>) }
    </tr>
  </>;
}