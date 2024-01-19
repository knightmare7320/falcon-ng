import { SiteState } from '../../../store/site.slice';

import BtsRows from "./BtsRows";
import SectorRows from "./SectorRows";
import CarrierRows from "./CarrierRows";

export default function EquipmentTab({btss, sectors, carriers}: {btss:SiteState['btss'], sectors: SiteState['sectors'], carriers: SiteState['carriers']}) {
  return <>
    <table className="site-table equipment" style={{width: '100%'}}>
      <tbody>
        <BtsRows     btss={btss} sectors={sectors} carriers={carriers}/>
        <SectorRows  btss={btss} sectors={sectors} carriers={carriers}/>
        <CarrierRows btss={btss} sectors={sectors} carriers={carriers}/>
      </tbody>
    </table>
  </>;
}