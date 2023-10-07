class Sites {
   static getPerf(db, params, result) {
      const sqlStr = 'CALL gui.get_sites_perf(?, ?, ?, ?, ?, ?, ?)';
      const sqlParams = [ 
         params.group_type,
         params.group_id,
         params.filter_string,
         params.order_by,
         params.order_dir,
         params.page_number,
         params.page_size,
      ];
      console.log(sqlStr);
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
               "group_type": results[0][0].group_type,
               "parent_id": results[0][0].parent_id,
               "parent_name": results[0][0].parent_name,
               "group_id": results[0][0].group_id,
               "group_name": results[0][0].group_name,
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = Sites;