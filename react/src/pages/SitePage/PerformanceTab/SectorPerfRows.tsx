import { PerformanceTabProps } from ".";


export default function SectorPerfRows({btss, sectors, carriers}:PerformanceTabProps) {
  if (!sectors) return <></>;

  let carrierCounts:Map<number, number> = new Map();
  btss.map(bts => {
    const carrierCount = carriers.filter(carrier => carrier.bts_id === bts.bts_id).length;
    carrierCounts.set(bts.bts_id, carrierCount);
  });


  return <>
    <tr>
      <th className="column-head top">Sector</th>
      {btss.map(
        bts => sectors.map(
          sector => 
            <td  className="column-head top" key={sector.sector_id} colSpan={carrierCounts.get(bts.bts_id) || 1}>
              <strong>{sector.sector_number}</strong>
            </td> 
        )
      )}
    </tr>
  </>;
}