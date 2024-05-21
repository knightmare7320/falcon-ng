class Regions {
   static get(db, result) {
      const sqlStr = 'CALL gui.get_regions()';
      db.query(
         sqlStr,
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, results[0]);
         }
      );      
   }

   static getPerf(db, params, result) {
      const sqlStr = 'CALL gui.get_regions_perf(?, ?, ?, ?, ?)';
      const sqlParams = [
         params.filter_string,
         params.order_by,
         params.order_dir,
         params.page_number,
         params.page_size,
      ];
      // console.log(sqlStr, sqlParams);
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
               "row_count": results[0][0].total_row_count,
               "rows": results[1].map(({region_id, region_name, ...row}) => {return {id: region_id, name: region_name, ...row}})
            });
         }
      );      
   }
}

module.exports = Regions;