import { ParamsTabProps } from ".";


export default function CarrierParamRows({btss=[], sectors=[], carriers=[]}:ParamsTabProps) {
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
      <th>pn_offset</th>
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
      <th>tadd</th>
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
      <th>tdrop</th>
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
      <th>tcomp</th>
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
      <th>ttdrop</th>
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
      <th>pilot_power</th>
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
      <th>searchwin_a</th>
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
      <th>searchwin_n</th>
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
      <th>searchwin_r</th>
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