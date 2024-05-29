import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal.js";
import { useDispatch, useSelector } from 'react-redux';
import { siteActions } from '../../store/site.slice';
import { RootState } from '../../store';
import { uiActions } from "../../store/ui.slice.js";

import Input from "./Input";
import Select from "./Select";

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

    console.log(formValues);
  }

  return (
    <Modal open={openFg} onClose={handleClose}>
      <header>Edit Site</header>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input 
          label="Site Name" 
          id="site_name" 
          value={formValues.site_name}
          onChange={(event)=>setFormValues({...formValues, site_name: event.target.value})}
          autoFocus
        />
        <Select
          label="Site Type"
          id="site_type_id"
          value={formValues.site_type_id}
          items={uiState.site_types}
          onChange={(event)=>setFormValues({...formValues, site_type_id: +event.target.value})}
        />
        <Input 
          label="Address" 
          id="address1" 
          value={formValues.address1}
          onChange={(event)=>setFormValues({...formValues, address1: event.target.value})}
        />
        <Input 
          label="City" 
          id="city" 
          value={formValues.city}
          onChange={(event)=>setFormValues({...formValues, city: event.target.value})}
        />
        <Input 
          label="State" 
          id="state" 
          value={formValues.state}
          onChange={(event)=>setFormValues({...formValues, state: event.target.value})}
        />
        <Input 
          label="Zip Code" 
          id="zip_code" 
          value={formValues.zip_code}
          onChange={(event)=>setFormValues({...formValues, zip_code: event.target.value})}
        />
        <Input 
          label="County" 
          id="county" 
          value={formValues.county}
          onChange={(event)=>setFormValues({...formValues, county: event.target.value})}
        />
        <Input 
          label="Latitude (&deg;N)" 
          id="latitude" 
          value={formValues.latitude}
          onChange={(event)=>setFormValues({...formValues, latitude: event.target.value})}
        />
        <Input 
          label="Longitude (&deg;E)" 
          id="longitude" 
          value={formValues.longitude}
          onChange={(event)=>setFormValues({...formValues, longitude: event.target.value})}
        />
        <Input 
          label="Elevation (ft)" 
          id="elevation_feet" 
          value={formValues.elevation_feet}
          onChange={(event)=>setFormValues({...formValues, elevation_feet: event.target.value})}
        />
        <Select
          label="Structure Type"
          id="structure_type_id"
          value={formValues.structure_type_id}
          items={uiState.structure_types}
          onChange={(event)=>setFormValues({...formValues, structure_type_id: +event.target.value})}
        />
        <Select
          label="Repair Priority"
          id="repair_priority_id"
          value={formValues.repair_priority_id}
          items={uiState.repair_priorities}
          onChange={(event)=>setFormValues({...formValues, repair_priority_id: +event.target.value})}
        />
        <Select
          label="Timezone"
          id="timezone_id"
          value={formValues.timezone_id}
          items={uiState.timezones}
          onChange={(event)=>setFormValues({...formValues, timezone_id: +event.target.value})}
        />

        <Select
          label="Region"
          id="region_id"
          value={formValues.region_id}
          items={uiState.regions}
          onChange={(event)=>setFormValues({...formValues, region_id: +event.target.value, l4_market_id: undefined, l5_market_id: undefined, org_cluster_id: undefined})}
        />
        <Select
          label="L4 Market"
          id="l4_market_id"
          value={formValues.l4_market_id}
          items={uiState.l4_markets.filter(val=> val.parent_id===formValues.region_id)}
          onChange={(event)=>setFormValues({...formValues, l4_market_id: +event.target.value, l5_market_id: undefined, org_cluster_id: undefined})}
        />        
        <Select
          label="L5 Market"
          id="l5_market_id"
          items={uiState.l5_markets.filter(val=> val.parent_id===formValues.l4_market_id)}
          value={formValues.l5_market_id}
          onChange={(event)=>setFormValues({...formValues, l5_market_id: +event.target.value, org_cluster_id: undefined})}
        />
        <Select
          label="Cluster"
          id="org_cluster_id"
          value={formValues.org_cluster_id}
          items={uiState.clusters.filter(val=> val.parent_id===formValues.l5_market_id)}
          onChange={(event)=>setFormValues({...formValues, org_cluster_id: +event.target.value})}
        />
      </form>
  

      <footer className={classes.actions}>  
        <button onClick={handleClose}> 
          Cancel
        </button>
        <button onClick={handleClose}> 
          Save
        </button>
      </footer>   
    </Modal>
  )
}
