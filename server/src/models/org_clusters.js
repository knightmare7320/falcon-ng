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
}

module.exports = orgClusters;