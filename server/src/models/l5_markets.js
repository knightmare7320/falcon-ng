class l5Markets {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_l5_markets(?)';
      const sqlParams = [
         params.l4_market_id
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
      const sqlStr = 'CALL gui.get_l5_markets_perf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.l4_market_id,
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
               "total_records": results[0][0].total_records,
               "rows": results[1]
            });
         }
      );   
   }
}

module.exports = l5Markets;