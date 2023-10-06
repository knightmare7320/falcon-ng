class Sites {
   static getPerf(db, params, result) {
      const sqlStr = 'CALL gui.get_sites(?, ?, ?, ?, ?, ?, ?)';
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
               "total_row_count": results[0][0].total_row_count,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = Sites;