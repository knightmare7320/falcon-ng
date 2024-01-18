class org_clusters {
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
            result(null, results[0]);
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
               "parent_id": results[0][0].parent_id,
               "parent_name": results[0][0].parent_name,
               "id": results[0][0].group_id,
               "name": results[0][0].group_name,
               "row_count": results[0][0].total_row_count,
               "rows": results[1].map(({org_cluster_id, org_cluster_name, ...row}) => {return {id: org_cluster_id, name: org_cluster_name, ...row}})

              });
         }
      );   
   }
}

module.exports = org_clusters;