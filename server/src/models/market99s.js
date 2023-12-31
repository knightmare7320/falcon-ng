class market99s {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_market99s(?)';
      const sqlParams = [
         params.region_id
      ]
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
      const sqlStr = 'CALL gui.get_market99s_perf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.region_id,
         params.filter_string,
         params.order_by,
         params.order_dir,
         params.page_number,
         params.page_size,
      ];
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
               "group_id": results[0][0].group_id,
               "group_name": results[0][0].group_name,
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );   
   }
}

module.exports = market99s;