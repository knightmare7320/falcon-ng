class Bscs {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_bscs(?, ?)';
      const sqlParams = [
         params.switch_id,
         params.equipment_vendor_id,
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
      const sqlStr = 'CALL gui.get_bscs_perf(?, ?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.switch_id,
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
               "switch_name": results[0][0].switch_name,
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = Bscs;