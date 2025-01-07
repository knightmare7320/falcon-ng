import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Modal from "../../components/ui/Modal.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";

import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import { uiActions } from "../../store/ui.slice.js";

import classes from "./EditSite.module.css";

export default function EditSiteDialog({openFg}: {openFg:boolean}) {  
  const dispatch = useDispatch();
  const site = useSelector((state:RootState) => state.site.site);
  const uiState = useSelector((state:RootState) => state.ui);

  const [ formValues, setFormValues ] = useState(site);

  useEffect(() => {
    dispatch(uiActions.fetchSiteTypes());
    dispatch(uiActions.fetchStructureTypes());
    dispatch(uiActions.fetchRepairPriorities());
    dispatch(uiActions.fetchTimezones());
  }, []);

  useEffect(() => {
    setFormValues(site);
  }, [site])
  
  function handleClose() {
    setFormValues(site);
    dispatch(siteActions.closeEditSite());
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(siteActions.saveEditSite(formValues));
  }

  return (
    <Modal open={openFg} onClose={handleClose}>
      <header>Edit Site {site.cascadeCode}</header>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input 
          label="Site Name" 
          id="siteName" 
          value={formValues.siteName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, siteName: event.target.value})}
          autoFocus
        />
        <Select
          label="Site Type"
          id="siteTypeId"
          value={formValues.siteTypeId}
          items={uiState.siteTypes}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, siteTypeId: +event.target.value})}
        />
        <Input 
          label="Address" 
          id="address" 
          value={formValues.address}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, address: event.target.value})}
        />
        <Input 
          label="City" 
          id="city" 
          value={formValues.city}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, city: event.target.value})}
        />
        <Input 
          label="State" 
          id="state" 
          value={formValues.state}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, state: event.target.value})}
        />
        <Input 
          label="Zip Code" 
          id="zipCode" 
          value={formValues.zipCode}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, zipCode: event.target.value})}
        />
        <Input 
          label="County" 
          id="county" 
          value={formValues.county}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, county: event.target.value})}
        />
        <Input 
          label="Latitude (&deg;N)" 
          id="latitude" 
          value={formValues.latitude}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, latitude: +event.target.value})}
        />
        <Input 
          label="Longitude (&deg;E)" 
          id="longitude" 
          value={formValues.longitude}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, longitude: +event.target.value})}
        />
        <Input 
          label="Elevation (ft)" 
          id="elevation" 
          value={formValues.elevation}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setFormValues({...formValues, elevation: +event.target.value})}
        />
        <Select
          label="Structure Type"
          id="structureTypeId"
          value={formValues.structureTypeId}
          items={uiState.structureTypes}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, structureTypeId: +event.target.value})}
        />
        <Select
          label="Repair Priority"
          id="repairPriorityId"
          value={formValues.repairPriorityId}
          items={uiState.repairPriorities}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, repairPriorityId: +event.target.value})}
        />
        <Select
          label="Timezone"
          id="timezoneId"
          value={formValues.timezoneId}
          items={uiState.timezones}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, timezoneId: +event.target.value})}
        />

        <Select
          label="Region"
          id="regionId"
          value={formValues.regionId}
          items={uiState.regions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, regionId: +event.target.value, l4MarketId: undefined, l5MarketId: undefined, orgClusterId: undefined})}
        />
        <Select
          label="L4 Market"
          id="l4MarketId"
          value={formValues.l4MarketId}
          items={uiState.l4Markets.filter(val=> val.parentId===formValues.regionId)}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, l4MarketId: +event.target.value, l5MarketId: undefined, orgClusterId: undefined})}
        />        
        <Select
          label="L5 Market"
          id="l5MarketId"
          items={uiState.l5Markets.filter(val=> val.parentId===formValues.l4MarketId)}
          value={formValues.l5MarketId}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, l5MarketId: +event.target.value, orgClusterId: undefined})}
        />
        <Select
          label="Cluster"
          id="orgClusterId"
          value={formValues.orgClusterId}
          items={uiState.orgClusters.filter(val=> val.parentId===formValues.l5MarketId)}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>setFormValues({...formValues, orgClusterId: +event.target.value})}
        />
  
        <footer className={classes.actions}>  
          <button type="button" onClick={handleClose}> 
            Cancel
          </button>
          <button type="submit"> 
            Save
          </button>
        </footer>   
      </form>
    </Modal>
  )
}
