class Switches {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_switches(?)';
      const sqlParams = [
         params.equipment_vendor_id
      ]
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

   static getPerf(db, params, result) {
      const sqlStr = 'CALL gui.get_switches_perf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.equipment_vendor_id,
         params.filter_string,
         params.order_by,
         params.order_dir,
         params.page_number,
         params.page_size,
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
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = Switches;