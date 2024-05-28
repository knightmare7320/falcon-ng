import { PerformanceTabProps } from ".";


export default function CarrierPerfRows({btss, sectors, carriers}:PerformanceTabProps) {
  if (!carriers) return <></>;

  return <>
    <tr>
      <th className="column-head top" style={{width:'140px'}}>Carrier</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>
              <td key={carrier.carrier_id} className="column-head top">
                <strong>{carrier.carrier_designation_name}</strong>
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Setup Attempts</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Equipment Blocks</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Access Failures</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Block %</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Successful Calls</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Primary Drops</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Drop %</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>Primary Erlangs</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
    <tr>
      <th>MOUs</th>
      {btss.map(
        bts => sectors.map(
          (_) => carriers.filter(carrier => carrier.bts_id === bts.bts_id).map(
            carrier =>           
              <td key={carrier.carrier_id}>
                &nbsp;
              </td>
          )
        )
      )}
    </tr>
  </>;
}