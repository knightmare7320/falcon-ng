import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal.js";
import { useDispatch, useSelector } from 'react-redux';
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

    console.log(formValues);
  }

  return (
    <Modal open={openFg} onClose={handleClose}>
      <header>Edit Site</header>

      <form onSubmit={handleSubmit} className={classes.form}>

        <label htmlFor="site_name">Site Name:</label>
        <input 
          id="site_name" 
          name="site_name" 
          value={formValues.site_name}
          onChange={(event)=>setFormValues({...formValues, site_name: event.target.value})}
          autoFocus
        />
        
        <label htmlFor="site_type_id">Site Type:</label>
        <select 
          id="site_type_id" 
          name="site_type_id" 
          value={formValues.site_type_id}
          onChange={(event)=>setFormValues({...formValues, site_type_id: +event.target.value})}
        >
          { uiState.site_types.map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="address1">Address:</label>
        <input 
          id="address1" 
          name="address1" 
          value={formValues.address1}
          onChange={(event)=>setFormValues({...formValues, address1: event.target.value})}
        />

        <label htmlFor="city">City:</label>
        <input 
          id="city" 
          name="city" 
          value={formValues.city}
          onChange={(event)=>setFormValues({...formValues, city: event.target.value})}
        />

        <label htmlFor="state">State:</label>
        <input 
          id="state" 
          name="state" 
          value={formValues.state}
          onChange={(event)=>setFormValues({...formValues, state: event.target.value})}
        />

        <label htmlFor="zip_code">Zip:</label>
        <input 
          id="zip_code" 
          name="zip_code" 
          value={formValues.zip_code}
          onChange={(event)=>setFormValues({...formValues, zip_code: event.target.value})}
        />

        <label htmlFor="county">County:</label>
        <input 
          id="county" 
          name="county" 
          value={formValues.county}
          onChange={(event)=>setFormValues({...formValues, county: event.target.value})}
        />

        <label htmlFor="latitude">Latitude (&deg;N):</label>
        <input 
          id="latitude" 
          name="latitude" 
          value={formValues.latitude}
          onChange={(event)=>setFormValues({...formValues, latitude: +event.target.value})}
        />

        <label htmlFor="longitude">Longitude (&deg;E):</label>
        <input 
          id="longitude" 
          name="longitude" 
          value={formValues.longitude}
          onChange={(event)=>setFormValues({...formValues, longitude: +event.target.value})}
        />

        <label htmlFor="elevation_feet">Elevation (ft):</label>
        <input 
          id="elevation_feet" 
          name="elevation_feet" 
          value={formValues.elevation_feet}
          onChange={(event)=>setFormValues({...formValues, elevation_feet: +event.target.value})}
        />

        <label htmlFor="structure_type_id">Structure Type:</label>
        <select 
          id="structure_type_id" 
          name="structure_type_id" 
          value={formValues.structure_type_id}
          onChange={(event)=>setFormValues({...formValues, structure_type_id: +event.target.value})}
        >
          { uiState.structure_types.map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="repair_priority_id">Repair Priority:</label>
        <select 
          id="repair_priority_id" 
          name="repair_priority_id" 
          value={formValues.repair_priority_id}
          onChange={(event)=>setFormValues({...formValues, repair_priority_id: +event.target.value})}
        >
          { uiState.repair_priorities.map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="timezone_id">Timezone:</label>
        <select 
          id="timezone_id" 
          name="timezone_id" 
          value={formValues.timezone_id}
          onChange={(event)=>setFormValues({...formValues, timezone_id: +event.target.value})}
        >
          { uiState.timezones.map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>



        <label htmlFor="region_id">Region:</label>
        <select 
          id="region_id" 
          name="region_id" 
          value={formValues.region_id}
          onChange={(event)=>setFormValues({...formValues, region_id: +event.target.value, l4_market_id: undefined, l5_market_id: undefined, org_cluster_id: undefined})}
        >
          { uiState.regions.map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="l4_market_id">L4 Market:</label>
        <select 
          id="l4_market_id" 
          name="l4_market_id" 
          value={formValues.l4_market_id}
          onChange={(event)=>setFormValues({...formValues, l4_market_id: +event.target.value, l5_market_id: undefined, org_cluster_id: undefined})}
        >
          <option key={0}></option>
          { uiState.l4_markets.filter(val=> val.parent_id===formValues.region_id).map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="l5_market_id">L5 Market:</label>
        <select 
          id="l5_market_id" 
          name="l5_market_id" 
          value={formValues.l5_market_id}
          onChange={(event)=>setFormValues({...formValues, l5_market_id: +event.target.value, org_cluster_id: undefined})}
        >
          <option key={0}></option>
          { uiState.l5_markets.filter(val=> val.parent_id===formValues.l4_market_id).map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

        <label htmlFor="org_cluster_id">Cluster:</label>
        <select 
          id="org_cluster_id" 
          name="org_cluster_id" 
          value={formValues.org_cluster_id}
          onChange={(event)=>setFormValues({...formValues, org_cluster_id: +event.target.value})}
        >
          <option key={0}></option>
          { uiState.clusters.filter(val=> val.parent_id===formValues.l5_market_id).map(item => 
            <option value={item.id} key={item.id}>{item.name}</option>
          )}
        </select>

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
