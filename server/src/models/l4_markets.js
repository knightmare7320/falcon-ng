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
            result(null, results[0]);
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
              "id": results[0][0].group_id,
              "name": results[0][0].group_name,
              "row_count": results[0][0].total_row_count,
              "rows": results[1].map(({l4_market_id, l4_market_name, ...row}) => {return {id: l4_market_id, name: l4_market_name, ...row}})
            });
         }
      );      
   }
}

module.exports = l4Markets;