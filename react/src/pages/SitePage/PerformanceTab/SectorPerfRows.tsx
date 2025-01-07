import { PerformanceTabProps } from ".";


export default function SectorPerfRows({btss, sectors, carriers}:PerformanceTabProps) {
  if (!sectors) return <></>;

  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.btsId === bts.btsId).length;
    carrierCounts.set(bts.btsId, carrierCount);
  });


  return <>
    <tr>
      <th className="column-head top">Sector</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td  className="column-head top" key={sector.sectorId} colSpan={carrierCounts.get(bts.btsId) || 1}>
              <strong>{sector.sectorNumber}</strong>
            </td> 
        )
      )}
    </tr>
  </>;
}