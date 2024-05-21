import BtsRows from "./BtsRows";
import SectorRows from "./SectorRows";
import CarrierRows from "./CarrierRows";

import { SiteState } from '../../../store/site.slice';
export type EquipmentTabProps = {
  btss:SiteState['btss'], 
  sectors: SiteState['sectors'], 
  carriers: SiteState['carriers']
};


export default function EquipmentTab({btss, sectors, carriers}: EquipmentTabProps) {
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