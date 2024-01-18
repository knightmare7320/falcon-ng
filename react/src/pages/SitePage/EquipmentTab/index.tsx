import { SiteState } from '../../../store/site.slice';

import BtsRows from "./BtsRows";
import SectorRows from "./SectorRows";
import CarrierRows from "./CarrierRows";
import { Bts, Sector, Carrier } from '../../../util/site.model';

export default function EquipmentTab({bts, sectors, carriers}: {bts:SiteState['bts'], sectors: SiteState['sectors'], carriers: SiteState['carriers']}) {

  const newBts = structuredClone(bts).sort((a:Bts, b:Bts) => a.bts_number > b.bts_number ? 1 : 0);
  const newSectors = structuredClone(sectors).sort((a:Sector, b:Sector) => a.sector_number > b.sector_number ? 1 : 0);
  const newCarriers = structuredClone(carriers).sort(
    (a:Carrier, b:Carrier) => 
      a.bts_id > b.bts_id || a.carrier_number > b.carrier_number ? 1 : 0
  );

  console.log(newCarriers);
  return <>
    <table className="site-table">
      <tbody>
        <BtsRows bts={newBts}/>
        <SectorRows sectors={newSectors}/>
        <CarrierRows carriers={newCarriers}/>
      </tbody>
    </table>
  </>;
}