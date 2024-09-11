import { EquipmentTabProps } from ".";


export default function SectorRows({btss, sectors, carriers}:EquipmentTabProps) {
  if (!sectors) return <></>;

  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.btsId === bts.btsId).length;
    carrierCounts.set(bts.btsId, carrierCount);
  });


  return <>
    <tr>
      <th className="column-head">Sector</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td className="column-head" key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              <strong>{sector.sectorNumber}</strong>
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Azimuth</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
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
            <td key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              {sector.heightAgl}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Mechanical Tilt</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              {sector.mechanicalTilt}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Antenna Vendor</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              {sector.equipmentVendorName}
            </td> 
        )
      )}
    </tr>
    <tr>
      <th>Antenna Model</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              {sector.antennaName}
            </td> 
        )
      )}
    </tr>
  </>;
}