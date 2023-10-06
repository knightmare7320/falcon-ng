class l4Markets {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_l4_markets(?)';
      const sqlParams = [
         params.region_id
      ]
      console.log(sqlParams);
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
      const sqlStr = 'CALL gui.get_l4_markets_perf(?, ?, ?, ?, ?, ?)';
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
               "region_name": results[0][0].region_name,
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = l4Markets;