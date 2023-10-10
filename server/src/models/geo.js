class Geo {
   static getSites(db, params, result) {
      const sqlStr = 'CALL gui.get_geo_sites(?, ?, ?, ?)';
      const sqlParams = [
         params.min_latitude,
         params.max_latitude,
         params.min_longitude,
         params.max_longitude,
      ];
      console.log(sqlStr, sqlParams);
      db.query(
         sqlStr,
         sqlParams,
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, {
               "rows": results[0]
            });
         }
      );      
   }
   static getSectors(db, params, result) {
      const sqlStr = 'CALL gui.get_geo_sectors(?, ?, ?, ?)';
      const sqlParams = [
         params.min_latitude,
         params.max_latitude,
         params.min_longitude,
         params.max_longitude,
      ];
      console.log(sqlStr, sqlParams);
      db.query(
         sqlStr,
         sqlParams,
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, {
               "rows": results[0]
            });
         }
      );      
   }
 
//  // TODO: had some trouble getting this working with the split DB's, and so fell back to old style js, need to clean this back up again
//  export const getGeoSectors = async (ctx:any, xtile: number, ytile: number, zoom: number) => {
//    const geoSectors: GeoSector[] = [];
 
//    const sites = await getGeoSites(ctx, xtile, ytile, zoom);
 
//    for (let i = 0; i < sites.length; i++) {
//      const sectors = await querySectors(ctx, sites[i].nme);
     
//      for (let j = 0; j < sectors.length; j++) {
//        geoSectors.push(
//          new GeoSector(
//            sites[i].nme, 
//            sites[i].lat, 
//            sites[i].lng,
//            sectors[j].sectorNumber, 
//            sectors[j].azimuth, 
//            sectors[j].horizontalBw,
//          )
//        )
//      }
//    }
//    return geoSectors;
//  }
 
//  // TODO: had some trouble getting this working with the split DB's, and so fell back to old style js, need to clean this back up again
//  export const getGeoCarriers = async (ctx:any, xtile: number, ytile: number, zoom: number) => {
//    const geoCarriers: GeoCarrier[] = [];
 
//    const sites = await getGeoSites(ctx, xtile, ytile, zoom);
 
//    for (let i = 0; i < sites.length; i++) {
//      const carriers = await queryCarriers(ctx, sites[i].nme);
     
//      for (let j = 0; j < carriers.length; j++) {
//        geoCarriers.push(
//          new GeoCarrier(
//            sites[i].nme, 
//            sites[i].lat, 
//            sites[i].lng,
//            carriers[j].sectorNumber, 
//            carriers[j].azimuth, 
//            carriers[j].horizontalBw,
//            carriers[j].sortOrder, 
//            carriers[j].carrierDesignationName, 
//            carriers[j].carrierTypeName, 
//            carriers[j].equipmentStatusName,
//          )
//        )
//      }
//    }
//    return geoCarriers;
}

module.exports = Geo;