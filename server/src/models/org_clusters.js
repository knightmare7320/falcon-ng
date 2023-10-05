class orgClusters {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_org_clusters(?)';
      const sqlParams = [
         params.l5_market_id
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
      const sqlStr = 'CALL gui.get_org_clusters_perf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.l5_market_id,
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
               "l5_market_name": results[0][0].l5_market_name,
               "total_records": results[0][0].total_records,
               "rows": results[1]
            });
         }
      );   
   }
}

module.exports = orgClusters;