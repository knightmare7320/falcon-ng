import { EquipmentTabProps } from ".";


export default function SectorRows({btss, sectors, carriers}:EquipmentTabProps) {
  if (!sectors) return <></>;

  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.bts_id === bts.bts_id).length;
    carrierCounts.set(bts.bts_id, carrierCount);
  });


  return <>
    <tr>
      <th className="column-head">Sector</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td  className="column-head" key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              <strong>{sector.sector_number}</strong>
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Azimuth</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              {sector.azimuth}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Antenna Height</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              {sector.height_agl}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Mechanical Tilt</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              {sector.mechanical_tilt}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Antenna Vendor</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              {sector.antenna_vendor_name}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Antenna Model</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              {sector.antenna_name}
            </td> 
        )
      )}
    </tr>
  </>;
}